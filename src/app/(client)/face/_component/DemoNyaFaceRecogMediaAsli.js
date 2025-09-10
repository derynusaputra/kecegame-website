// WAJIB: Menandakan ini adalah Client Component agar bisa akses browser API
"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

// Fungsi untuk menghitung cosine similarity antara dua vector (embedding)
const cosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB) return 0;
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
};

// Fungsi untuk normalize vector: subtract mean dan divide by std
const normalizeVector = (vec) => {
  const mean = vec.reduce((a, b) => a + b, 0) / vec.length;
  const centered = vec.map((v) => v - mean);
  const variance = centered.reduce((a, b) => a + b * b, 0) / vec.length;
  const std = Math.sqrt(variance);
  if (std === 0) return centered;
  return centered.map((v) => v / std);
};

const DemoNya = () => {
  // Refs untuk elemen DOM dan instance MediaPipe
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);

  // State untuk mengelola aplikasi
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Memuat model AI...");
  const [enrolledFaces, setEnrolledFaces] = useState([]);
  const [recognizedName, setRecognizedName] = useState(
    "Arahkan wajah ke kamera"
  );
  const [enrollName, setEnrollName] = useState("");

  // --- LOGIKA UTAMA MEDIAPIPE ---
  useEffect(() => {
    // Muat data dari local storage saat komponen pertama kali render
    const storedFaces = localStorage.getItem("enrolledFaces");
    if (storedFaces) {
      setEnrolledFaces(JSON.parse(storedFaces));
    }

    // Fungsi untuk inisialisasi FaceLandmarker
    const setupMediaPipe = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        const landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "GPU",
          },
          outputFaceBlendshapes: false, // Tidak perlu blendshapes untuk recognition
          runningMode: "VIDEO",
          numFaces: 1,
        });
        console.log("landmarker", landmarker);
        faceLandmarkerRef.current = landmarker;
        startWebcam(); // Panggil webcam setelah model siap
      } catch (error) {
        console.error("Gagal setup MediaPipe:", error);
        setLoadingMessage("Gagal memuat model. Coba refresh halaman.");
      }
    };

    setupMediaPipe();

    // Cleanup function: akan dijalankan saat komponen di-unmount
    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Efek untuk menyimpan ke local storage setiap kali ada perubahan pada wajah terdaftar
  useEffect(() => {
    if (enrolledFaces.length > 0) {
      localStorage.setItem("enrolledFaces", JSON.stringify(enrolledFaces));
    }
  }, [enrolledFaces]);

  // Fungsi untuk memulai webcam
  const startWebcam = async () => {
    setLoadingMessage("Mengakses kamera...");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });
      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener("loadeddata", () => {
        setIsLoading(false);
        predictWebcam(); // Mulai loop deteksi
      });
    } catch (err) {
      console.error("Error mengakses webcam: ", err);
      setLoadingMessage("Gagal akses kamera. Izinkan akses di browser Anda.");
    }
  };

  // Loop utama untuk deteksi dan pengenalan per frame
  const predictWebcam = () => {
    const video = videoRef.current;
    if (!video || !faceLandmarkerRef.current) {
      animationFrameIdRef.current = requestAnimationFrame(predictWebcam);
      return;
    }

    if (video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;
      const results = faceLandmarkerRef.current.detectForVideo(
        video,
        Date.now()
      );

      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      if (results.faceLandmarks && results.faceLandmarks.length > 0) {
        // Gunakan flattened landmarks sebagai embedding
        const liveEmbedding = results.faceLandmarks[0].flatMap((lm) => [
          lm.x,
          lm.y,
          lm.z,
        ]);
        const liveNorm = normalizeVector(liveEmbedding);
        recognizeFace(liveNorm); // Panggil fungsi pengenalan

        // Menggambar bounding box (opsional, dari keypoints)
        const landmarks = results.faceLandmarks[0];
        const { xMin, xMax, yMin, yMax } = getBoundingBox(
          landmarks,
          video.videoWidth,
          video.videoHeight
        );
        canvasCtx.strokeStyle = "#32CD32"; // Warna hijau limau
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);
      } else {
        setRecognizedName("Wajah tidak terdeteksi");
      }
    }

    animationFrameIdRef.current = requestAnimationFrame(predictWebcam);
  };

  // --- LOGIKA FACE RECOGNITION 1:N ---

  const recognizeFace = (liveNorm) => {
    if (enrolledFaces.length === 0) {
      setRecognizedName("Database wajah kosong");
      return;
    }

    const SIMILARITY_THRESHOLD = 0.7; // Turunkan threshold jika perlu, test dan adjust berdasarkan eksperimen
    let bestMatch = { name: "Tidak Dikenali", similarity: 0.0 };

    enrolledFaces.forEach((enrolledFace) => {
      const similarity = cosineSimilarity(
        liveNorm,
        enrolledFace.embedding // Sudah normalized saat enroll
      );
      if (similarity > bestMatch.similarity) {
        bestMatch = { name: enrolledFace.name, similarity };
      }
    });

    if (bestMatch.similarity > SIMILARITY_THRESHOLD) {
      setRecognizedName(
        `${bestMatch.name} (${Math.round(bestMatch.similarity * 100)}%)`
      );
    } else {
      setRecognizedName("Tidak Dikenali");
    }
  };

  const handleEnroll = () => {
    if (!enrollName) {
      alert("Silakan masukkan nama.");
      return;
    }
    const landmarker = faceLandmarkerRef.current;
    if (!landmarker) {
      alert("Model belum siap. Tunggu sebentar.");
      return;
    }
    const results = landmarker.detectForVideo(videoRef.current, Date.now());

    if (results.faceLandmarks && results.faceLandmarks.length > 0) {
      const newEmbedding = results.faceLandmarks[0].flatMap((lm) => [
        lm.x,
        lm.y,
        lm.z,
      ]);
      const newNorm = normalizeVector(newEmbedding);
      setEnrolledFaces([
        ...enrolledFaces,
        { name: enrollName, embedding: newNorm },
      ]);
      alert(`Wajah ${enrollName} berhasil didaftarkan!`);
      setEnrollName("");
    } else {
      alert(
        "Gagal mendaftarkan wajah. Pastikan wajah terlihat jelas di kamera."
      );
    }
  };

  // Fungsi helper untuk mendapatkan bounding box dari landmarks
  const getBoundingBox = (landmarks, videoWidth, videoHeight) => {
    const xCoords = landmarks.map((lm) => lm.x * videoWidth);
    const yCoords = landmarks.map((lm) => lm.y * videoHeight);
    return {
      xMin: Math.min(...xCoords),
      xMax: Math.max(...xCoords),
      yMin: Math.min(...yCoords),
      yMax: Math.max(...yCoords),
    };
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800 p-8">
      <div className="flex flex-col items-center rounded-lg bg-gray-900 p-4 font-sans text-white shadow-lg">
        {/* Tampilan Video dan Canvas */}
        <div className="relative mb-4 h-[480px] w-[640px]">
          {isLoading && (
            <div className="bg-opacity-70 absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black">
              <p className="text-xl">{loadingMessage}</p>
            </div>
          )}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute top-0 left-0 h-full w-full -scale-x-100 transform"
          />
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            className="absolute top-0 left-0 z-10 h-full w-full -scale-x-100 transform"
          />
        </div>

        {/* Tampilan Hasil dan Kontrol */}
        <div className="w-[640px] rounded-md bg-gray-800 p-4">
          <h2 className="mb-2 text-center text-2xl font-bold">
            Hasil: <span className="text-teal-400">{recognizedName}</span>
          </h2>

          <div className="my-4 flex gap-4">
            <input
              type="text"
              placeholder="Masukkan Nama Anda"
              value={enrollName}
              onChange={(e) => setEnrollName(e.target.value)}
              className="flex-grow rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            <button
              onClick={handleEnroll}
              disabled={isLoading}
              className="rounded-md bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700 disabled:bg-gray-500"
            >
              Daftarkan Wajah
            </button>
          </div>

          {/* Daftar Wajah Terdaftar */}
          <div>
            <h3 className="border-b border-gray-700 text-lg font-semibold">
              Database Wajah:
            </h3>
            {enrolledFaces.length > 0 ? (
              <ul className="mt-2 list-inside list-disc">
                {enrolledFaces.map((face, index) => (
                  <li key={index}>{face.name}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-gray-400">
                Belum ada wajah yang terdaftar.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DemoNya;
