"use client";
import React, { useEffect, useRef, useState } from "react";

import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";

const DemoNya = () => {
  const [faceDetector, setFaceDetector] = useState(null);
  const [runningMode, setRunningMode] = useState("IMAGE");
  const videoRef = useRef(null);
  const liveViewRef = useRef(null);
  const childrenRef = useRef([]);
  const demosSectionRef = useRef(null);

  // Init Face Detector
  useEffect(() => {
    const initFaceDetector = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const detector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
          delegate: "GPU",
        },
        runningMode: "video",
      });
      setFaceDetector(detector);
      if (demosSectionRef.current) {
        demosSectionRef.current.classList.remove("opacity-20");
      }
    };
    initFaceDetector();
  }, []);

  // Click handler
  const handleClick = async (event) => {
    if (!faceDetector) return;

    if (runningMode === "VIDEO") {
      setRunningMode("IMAGE");
      await faceDetector.setOptions({ runningMode: "IMAGE" });
    }

    const parent = event.target.parentNode;
    parent
      .querySelectorAll(".highlighter,.info,.key-point")
      .forEach((el) => el.remove());

    const detections = faceDetector.detect(event.target).detections;
    displayImageDetections(detections, event.target);
  };

  const displayImageDetections = (detections, resultElement) => {
    const ratio = resultElement.height / resultElement.naturalHeight;

    detections.forEach((detection) => {
      const p = document.createElement("p");
      p.className =
        "absolute px-1 text-xs text-white bg-teal-700 border border-dashed info border-white/70";
      p.innerText =
        "Confidence: " +
        Math.round(parseFloat(detection.categories[0].score) * 100) +
        "% .";
      p.style.left = detection.boundingBox.originX * ratio + "px";
      p.style.top = detection.boundingBox.originY * ratio - 30 + "px";
      p.style.width = detection.boundingBox.width * ratio - 10 + "px";

      const highlighter = document.createElement("div");
      highlighter.className =
        "absolute border border-white border-dashed highlighter bg-green-400/25";
      highlighter.style.left = detection.boundingBox.originX * ratio + "px";
      highlighter.style.top = detection.boundingBox.originY * ratio + "px";
      highlighter.style.width = detection.boundingBox.width * ratio + "px";
      highlighter.style.height = detection.boundingBox.height * ratio + "px";

      resultElement.parentNode.appendChild(highlighter);
      resultElement.parentNode.appendChild(p);

      detection.keypoints.forEach((keypoint) => {
        const keypointEl = document.createElement("span");
        keypointEl.className =
          "key-point absolute w-[3px] h-[3px] bg-red-600 rounded-full";
        keypointEl.style.top = `${keypoint.y * resultElement.height - 3}px`;
        keypointEl.style.left = `${keypoint.x * resultElement.width - 3}px`;
        resultElement.parentNode.appendChild(keypointEl);
      });
    });
  };

  // Webcam
  const enableCam = async () => {
    if (!faceDetector) {
      alert("Face Detector is still loading. Please try again..");
      return;
    }
    document.getElementById("webcamButton").classList.add("hidden");

    const constraints = { video: true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoRef.current.srcObject = stream;
    videoRef.current.addEventListener("loadeddata", predictWebcam);
  };

  let lastVideoTime = -1;
  const predictWebcam = async () => {
    if (runningMode === "IMAGE") {
      setRunningMode("VIDEO");
      await faceDetector.setOptions({ runningMode: "VIDEO" });
    }
    let startTimeMs = performance.now();

    if (videoRef.current.currentTime !== lastVideoTime) {
      lastVideoTime = videoRef.current.currentTime;
      const detections = faceDetector.detectForVideo(
        videoRef.current,
        startTimeMs
      ).detections;
      displayVideoDetections(detections);
    }

    window.requestAnimationFrame(predictWebcam);
  };

  const displayVideoDetections = (detections) => {
    childrenRef.current.forEach((child) => {
      liveViewRef.current.removeChild(child);
    });
    childrenRef.current = [];

    detections.forEach((detection) => {
      const p = document.createElement("p");
      p.className =
        "absolute px-1 text-xs text-white bg-teal-700 border border-dashed border-white/70";
      p.innerText =
        "Confidence: " +
        Math.round(parseFloat(detection.categories[0].score) * 100) +
        "% .";
      p.style.left =
        videoRef.current.offsetWidth -
        detection.boundingBox.width -
        detection.boundingBox.originX +
        "px";
      p.style.top = detection.boundingBox.originY - 30 + "px";
      p.style.width = detection.boundingBox.width - 10 + "px";

      const highlighter = document.createElement("div");
      highlighter.className =
        "absolute border border-white border-dashed bg-green-400/25";
      highlighter.style.left =
        videoRef.current.offsetWidth -
        detection.boundingBox.width -
        detection.boundingBox.originX +
        "px";
      highlighter.style.top = detection.boundingBox.originY + "px";
      highlighter.style.width = detection.boundingBox.width - 10 + "px";
      highlighter.style.height = detection.boundingBox.height + "px";

      liveViewRef.current.appendChild(highlighter);
      liveViewRef.current.appendChild(p);

      childrenRef.current.push(highlighter);
      childrenRef.current.push(p);

      detection.keypoints.forEach((keypoint) => {
        const keypointEl = document.createElement("span");
        keypointEl.className =
          "absolute w-[3px] h-[3px] bg-red-600 rounded-full";
        keypointEl.style.top = `${
          keypoint.y * videoRef.current.offsetHeight - 3
        }px`;
        keypointEl.style.left = `${
          videoRef.current.offsetWidth -
          keypoint.x * videoRef.current.offsetWidth -
          3
        }px`;
        liveViewRef.current.appendChild(keypointEl);
        childrenRef.current.push(keypointEl);
      });
    });
  };

  return (
    <div className="p-8 font-sans text-gray-800">
      <h1 className="mb-6 text-2xl font-bold text-teal-700">
        Face detection using MediaPipe in React + Tailwind
      </h1>

      <section
        id="demos"
        ref={demosSectionRef}
        className="opacity-20 transition-opacity duration-500"
      >
        <h2 className="mb-2 text-lg font-semibold">Demo: Detecting Faces</h2>
        <p className="mb-4">
          <b>Click on an image below</b> to detect faces in the image.
        </p>

        {/* <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative w-[48%] cursor-pointer">
            <img
              src="https://assets.codepen.io/9177687/female-4572747_640.jpg"
              alt="face1"
              className="w-full"
              onClick={handleClick}
            />
          </div>
          <div className="relative w-[48%] cursor-pointer">
            <img
              src="https://assets.codepen.io/9177687/idea-gcbe74dc69_1920.jpg"
              alt="face2"
              className="w-full"
              onClick={handleClick}
            />
          </div>
        </div> */}

        <h2 className="mb-2 text-lg font-semibold">
          Demo: Webcam continuous face detection
        </h2>
        <p className="mb-4">
          Detect faces from your webcam. When ready click <b>"enable webcam"</b>{" "}
          below and accept access to the webcam.
        </p>

        <div
          id="liveView"
          ref={liveViewRef}
          className="relative w-[48%] border border-gray-300 p-2"
        >
          <button
            id="webcamButton"
            onClick={enableCam}
            className="mb-2 rounded bg-teal-700 px-4 py-2 text-white"
          >
            ENABLE WEBCAM
          </button>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="block w-full -scale-x-100 transform"
          ></video>
        </div>
      </section>
    </div>
  );
};

export default DemoNya;
