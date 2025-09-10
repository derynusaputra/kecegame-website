"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";

function MediaPipeCom() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [error, setError] = useState("");
  const faceDetectorRef = useRef(null);

  const initializeMediapipe = async () => {
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

  useEffect(() => {
    initializeMediapipe();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Model loaded: {isModelLoaded ? "yes" : "no"}</p>
      {isLoading && <p>Loading model…</p>}
    </div>
  );
}

export default MediaPipeCom;
