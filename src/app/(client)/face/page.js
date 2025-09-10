"use client";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import MediaPipeCom from "./_component/MediaPipeCom";
import FaceRecognition from "./_component/FaceRecognition";
import DemoNya from "./_component/DemoNya";
import FaceDery from "./_component/FaceDery";
import Gesture from "./_component/Gesture";

function page() {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const net = await cocoSsd.load();
      setModel(net);
      console.log("Model loaded");
    };
    loadModel();
  }, []);

  const detect = async () => {
    if (
      model &&
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const predictions = await model.detect(video);
      console.log(predictions);
    }
  };

  return (
    <div>
      {/* <Webcam
        ref={webcamRef}
        id="videoSource"
        width="640"
        height="480"
        muted
        autoPlay
      /> */}
      <button onClick={detect}>Detect</button>
      {/* <MediaPipeCom /> */}
      {/* <FaceRecognition /> */}
      {/* <DemoNya /> */}
      <Gesture />
    </div>
  );
}

export default page;
