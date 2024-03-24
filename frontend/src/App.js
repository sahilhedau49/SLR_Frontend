import { useEffect, useState } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import testImg from "./more1.jpg";

function App() {
  const [model, setModel] = useState();

  const preprocessImage = (image) => {
    const resizedImage = tf.image.resizeBilinear(image, [224, 224]);
    const normalizedImage = resizedImage.div(255.0);
    const expandedImage = normalizedImage.expandDims(0);
    return expandedImage;
  };

  const loadImageAndPreprocess = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const imageBitmap = await createImageBitmap(blob);
    const imageData = tf.browser.fromPixels(imageBitmap);
    const preprocessedImage = preprocessImage(imageData);
    return preprocessedImage;
  };

  const predictImage = async (imageUrl) => {
    const preprocessedImage = await loadImageAndPreprocess(imageUrl);
    const predictions = await model.predict(preprocessedImage);
    const predictionsData = predictions.dataSync();
    const predictionsArray = Array.from(predictionsData);
    console.log(predictionsArray);
    const predictedClassIndex = predictionsArray.indexOf(
      Math.max(...predictionsArray)
    );
    const classLabels = ["1", "2", "3", "4", "5", "6", "7"];
    const predictedClass = classLabels[predictedClassIndex];
    console.log(predictedClass);
  };

  useEffect(() => {
    const loadModel = async () => {
      console.log("Model importing...");
      const modelloaded = await tf.loadLayersModel("model.json");
      setModel(modelloaded);
      console.log("Model imported!!!");
    };

    loadModel();
  }, []);

  return (
    <div>
      <p> Hello World </p>

      <button
        onClick={() => {
          predictImage(testImg);
        }}
      >
        Predict
      </button>
    </div>
  );
}

export default App;
