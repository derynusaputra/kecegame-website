import React, { useRef, useState, useEffect } from "react";
import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";

function FaceRecogCom() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [error, setError] = useState("");

  const faceDetectorRef = useRef(null);
  const lastFrameTimeRef = useRef(Date.now());
  const lastVideoTimeRef = useRef(-1);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    initializeMediaPipe();

    return () => {
      if (animationFrameRef.current != null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const initializeMediaPipe = async () => {
    try {
      setIsLoading(true);
      setError("");

      const vision = await FilesetResolver.forVisionTasks({
        basePath:
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
      });

      faceDetectorRef.current = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        minDetectionConfidence: 0.3,
      });

      setIsModelLoaded(true);
      console.log("MediaPipe Tasks API initialized successfully");
    } catch (err) {
      setError(
        "Failed to initialize AI models. Please check your internet connection."
      );
      console.error("MediaPipe initialization error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const detectFacesInVideo = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const detector = faceDetectorRef.current;

    if (!video || !canvas || !detector) {
      animationFrameRef.current = requestAnimationFrame(detectFacesInVideo);
      return;
    }

    // Samakan ukuran canvas dengan video
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (vw && vh && (canvas.width !== vw || canvas.height !== vh)) {
      canvas.width = vw;
      canvas.height = vh;
    }

    // Cek frame baru
    if (
      video.currentTime !== lastVideoTimeRef.current &&
      !video.paused &&
      !video.ended
    ) {
      try {
        const results = detector.detectForVideo(video, performance.now());
        const ctx = canvas.getContext("2d");

        if (
          ctx &&
          results &&
          results.detections &&
          results.detections.length > 0
        ) {
          const faces = results.detections.map((d, index) => {
            const box = d.boundingBoxes?.[0] ||
              d.boundingBox || {
                originX: 0,
                originY: 0,
                width: 0,
                height: 0,
              };

            return {
              id: index + 1,
              confidence: d.categories?.[0]?.score ?? 0,
              boundingBox: {
                x: box.originX ?? 0,
                y: box.originY ?? 0,
                width: box.width ?? 0,
                height: box.height ?? 0,
              },
            };
          });

          setDetectedFaces(faces);
          drawDetections(ctx, faces);

          // Gambar ke canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          faces.forEach((face) => {
            const { x, y, width, height } = face.boundingBox;
            ctx.strokeRect(
              x * canvas.width,
              y * canvas.height,
              width * canvas.width,
              height * canvas.height
            );
          });
        }

        lastVideoTimeRef.current = video.currentTime;
      } catch (err) {
        console.error("Face detection error:", err);
      }
    }

    animationFrameRef.current = requestAnimationFrame(detectFacesInVideo);
  }, [
    videoRef,
    canvasRef,
    faceDetectorRef,
    lastVideoTimeRef,
    animationFrameRef,
    setDetectedFaces,
  ]);

  function drawDetections(ctx, faces) {
    if (!ctx) return;

    // Bersihkan canvas
    if (ctx.canvas.width && ctx.canvas.height) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    faces.forEach((face, index) => {
      const { x, y, width, height } = face.boundingBox;

      // Gambar bounding box
      ctx.strokeStyle = "#00ff88";
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);

      // Tampilkan confidence score
      ctx.fillStyle = "#00ff88";
      ctx.font = "bold 16px Arial";
      ctx.fillText(
        `Face ${index + 1}: ${(face.confidence * 100).toFixed(1)}%`,
        x,
        y - 10
      );

      // Tambah kotak kecil di sudut bounding box
      ctx.fillStyle = "#00ff88";
      const cornerSize = 8;
      const corners = [
        [x, y],
        [x + width, y],
        [x, y + height],
        [x + width, y + height],
      ];

      corners.forEach(([cx, cy]) => {
        ctx.fillRect(
          cx - cornerSize / 2,
          cy - cornerSize / 2,
          cornerSize,
          cornerSize
        );
      });
    });
  }

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="640"
        height="480"
      />
      <canvas ref={canvasRef} width="640" height="480" />

      {isLoading && <p>Loading model…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Model loaded: {isModelLoaded ? "yes" : "no"}</p>
      <p>Detected faces: {detectedFaces.length}</p>
    </div>
  );
}

export default FaceRecogCom;
