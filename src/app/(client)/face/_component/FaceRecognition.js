import React, { useRef, useState, useEffect, useCallback } from "react";
import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Play, Square, Camera } from "lucide-react";

function FaceRecognition() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [error, setError] = useState("");

  const faceDetectorRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);
  const animationFrameRef = useRef(null);

  // Inisialisasi MediaPipe
  const initializeMediaPipe = async () => {
    try {
      setIsLoading(true);
      setError("");

      const vision = await FilesetResolver.forVisionTasks({
        basePath:
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm",
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
      // console.error("MediaPipe initialization error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Gambar hasil deteksi
  const drawDetections = (ctx, faces, video, canvas) => {
    // gambar video feed ke canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    faces.forEach((face, index) => {
      const { x, y, width, height } = face.boundingBox;

      // scaling ke ukuran canvas
      const bx = x * canvas.width;
      const by = y * canvas.height;
      const bw = width * canvas.width;
      const bh = height * canvas.height;

      ctx.strokeStyle = "#00ff88";
      ctx.lineWidth = 3;
      ctx.strokeRect(bx, by, bw, bh);

      ctx.fillStyle = "#00ff88";
      ctx.font = "bold 16px Arial";
      ctx.fillText(
        `Face ${index + 1}: ${(face.confidence * 100).toFixed(1)}%`,
        bx,
        by - 10
      );
    });
  };

  // Loop deteksi wajah
  const detectFacesInVideo = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const detector = faceDetectorRef.current;

    if (!video || !canvas || !detector) {
      animationFrameRef.current = requestAnimationFrame(detectFacesInVideo);
      return;
    }

    if (
      video.currentTime !== lastVideoTimeRef.current &&
      !video.paused &&
      !video.ended
    ) {
      try {
        const results = detector.detectForVideo(video, performance.now());
        const ctx = canvas.getContext("2d");

        if (ctx) {
          if (results && results.detections && results.detections.length > 0) {
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
            drawDetections(ctx, faces, video, canvas);
          } else {
            setDetectedFaces([]);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          }
        }
      } catch (err) {
        console.error("Face detection error:", err);
      }

      lastVideoTimeRef.current = video.currentTime;
    }

    animationFrameRef.current = requestAnimationFrame(detectFacesInVideo);
  }, []);

  // START CAMERA
  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError("");

      if (!videoRef.current || !isModelLoaded) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      });

      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = async () => {
        const { videoWidth, videoHeight } = videoRef.current;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        setIsStreaming(true);

        if (faceDetectorRef.current) {
          await faceDetectorRef.current.setOptions({ runningMode: "VIDEO" });
        }

        // cancel loop lama biar ga double
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        detectFacesInVideo();
      };
    } catch (err) {
      setError("Camera access denied. Please allow camera permissions.");
      console.error("Camera error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // STOP CAMERA
  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    setIsStreaming(false);
    setDetectedFaces([]);

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  useEffect(() => {
    initializeMediaPipe();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <Camera className="mx-auto mb-6 h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-4" />
          <h1 className="mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-5xl font-bold text-transparent">
            AI Face Recognition Demo
          </h1>
        </motion.div>

        {/* Status Model */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          {isModelLoaded ? (
            <>
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span className="font-semibold text-green-400">
                AI Model Ready
              </span>
            </>
          ) : (
            <>
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-400"></div>
              <span className="text-blue-400">Loading AI Models...</span>
            </>
          )}
        </motion.div>

        {/* Error Handling */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 flex items-center gap-3 rounded-lg border border-red-500 bg-red-900/50 p-4"
            >
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="text-red-300">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Kamera */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl bg-gray-800/50 p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <Camera className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold">Live Camera</h2>
            </div>

            <div className="relative mb-6 overflow-hidden rounded-xl bg-gray-900">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-80 w-full object-cover"
                style={{ display: isStreaming ? "block" : "none" }}
              />
              {!isStreaming && (
                <div className="flex h-80 w-full items-center justify-center bg-gray-800">
                  <Camera className="mx-auto mb-4 h-16 w-16 text-gray-500" />
                  <p className="text-gray-400">Camera feed will appear here</p>
                </div>
              )}
              <canvas
                ref={canvasRef}
                className="pointer-events-none absolute top-0 left-0 h-full w-full"
              />
            </div>

            {/* Tombol */}
            <div className="flex gap-4">
              <button
                onClick={startCamera}
                disabled={!isModelLoaded || isStreaming || isLoading}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 font-semibold text-white hover:from-green-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600"
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                ) : (
                  <Play className="h-5 w-5" />
                )}
                Start Camera
              </button>
              <button
                onClick={stopCamera}
                disabled={!isStreaming}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 font-semibold text-white hover:from-red-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600"
              >
                <Square className="h-5 w-5" />
                Stop Camera
              </button>
            </div>

            {/* Info jumlah wajah */}
            {detectedFaces.length > 0 && (
              <p className="mt-4 text-center text-green-400">
                Detected Faces: {detectedFaces.length}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default FaceRecognition;
