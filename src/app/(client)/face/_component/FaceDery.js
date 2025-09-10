// WAJIB: Menandakan ini adalah Client Component agar bisa akses browser API
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

// HAND_CONNECTIONS adalah array koneksi landmark tangan
const HAND_CONNECTIONS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4], // Thumb
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8], // Index
  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12], // Middle
  [9, 13],
  [13, 14],
  [14, 15],
  [15, 16], // Ring
  [13, 17],
  [17, 18],
  [18, 19],
  [19, 20], // Pinky
  [0, 17], // Palm base
];

const GestureRecognizerComponent = () => {
  // Refs untuk elemen DOM dan instance MediaPipe
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const gestureRecognizerRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);

  // State untuk mengelola aplikasi
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Memuat model AI...");
  const [recognizedGesture, setRecognizedGesture] = useState(
    "Arahkan tangan ke kamera"
  );

  // --- LOGIKA UTAMA MEDIAPIPE ---
  useEffect(() => {
    // Fungsi untuk inisialisasi GestureRecognizer
    const setupMediaPipe = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        const recognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task`,
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 2,
        });
        console.log("recognizer", recognizer);
        gestureRecognizerRef.current = recognizer;
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
    if (!video || !gestureRecognizerRef.current) {
      animationFrameIdRef.current = requestAnimationFrame(predictWebcam);
      return;
    }

    if (video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;
      const results = gestureRecognizerRef.current.recognizeForVideo(
        video,
        Date.now()
      );

      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      const drawingUtils = new DrawingUtils(canvasCtx);

      if (results.landmarks && results.landmarks.length > 0) {
        for (const landmarks of results.landmarks) {
          drawingUtils.drawConnectors(landmarks, HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 5,
          });
          drawingUtils.drawLandmarks(landmarks, {
            color: "#FF0000",
            lineWidth: 2,
          });
        }

        // Update recognized gesture
        if (results.gestures && results.gestures.length > 0) {
          const primaryGesture = results.gestures[0][0]; // Ambil gesture pertama dengan score tertinggi
          const categoryName = primaryGesture.categoryName;
          const score = Math.round(primaryGesture.score * 100);
          setRecognizedGesture(`${categoryName} (${score}%)`);
        } else {
          setRecognizedGesture("Tidak ada gesture terdeteksi");
        }
      } else {
        setRecognizedGesture("Tangan tidak terdeteksi");
      }

      canvasCtx.restore();
    }

    animationFrameIdRef.current = requestAnimationFrame(predictWebcam);
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

        {/* Tampilan Hasil */}
        <div className="w-[640px] rounded-md bg-gray-800 p-4">
          <h2 className="mb-2 text-center text-2xl font-bold">
            Hasil: <span className="text-teal-400">{recognizedGesture}</span>
          </h2>
        </div>
      </div>
    </main>
  );
};

export default GestureRecognizerComponent;
