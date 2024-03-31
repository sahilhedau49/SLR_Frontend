import { useEffect, useState } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";

function App() {
  const [imageUrl, setImageUrl] = useState();
  const [model, setModel] = useState();
  const [imageSrc, setImageSrc] = useState(null);
  const [predictedClass, setPredictedClass] = useState("Null");
  const [accuracy, setAccuracy] = useState(0);

  const preprocessImage = (image) => {
    const resizedImage = tf.image.resizeBilinear(image, [48, 48]);
    const normalizedImage = resizedImage.div(255.0);
    const expandedImage = normalizedImage.expandDims(0);
    return expandedImage;
  };

  // const loadImageAndPreprocess = async (imageUrl) => {
  //   const response = await fetch(imageUrl);
  //   const blob = await response.blob();
  //   const imageBitmap = await createImageBitmap(blob);
  //   const imageData = tf.browser.fromPixels(imageBitmap);
  //   const preprocessedImage = preprocessImage(imageData);
  //   return preprocessedImage;
  // };

  const loadImageAndPreprocess = async (imageFile) => {
    const reader = new FileReader();
    const loadImagePromise = new Promise((resolve, reject) => {
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        const img = new Image();
        img.onload = () => {
          const imageData = tf.browser.fromPixels(img);
          const preprocessedImage = preprocessImage(imageData);
          resolve(preprocessedImage);
        };
        img.onerror = (error) => {
          reject(error);
        };
        img.src = e.target.result;
      };
    });
    reader.readAsDataURL(imageFile);
    return loadImagePromise;
  };

  const predictImage = async () => {
    const preprocessedImage = await loadImageAndPreprocess(imageUrl);
    const predictions = await model.predict(preprocessedImage);
    const predictionsData = predictions.dataSync();
    const predictionsArray = Array.from(predictionsData);
    console.log(predictionsArray);
    const predictedClassIndex = predictionsArray.indexOf(
      Math.max(...predictionsArray)
    );
    const classLabels = ["A", "M", "N", "S", "T", "blank"];
    const gotPredictedClass = classLabels[predictedClassIndex];
    console.log(gotPredictedClass);
    console.log(predictionsArray[predictedClassIndex]);
    setPredictedClass(gotPredictedClass);
    setAccuracy(predictionsArray[predictedClassIndex] * 100);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageUrl(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  useEffect(() => {
    const loadModel = async () => {
      console.log("Model importing...");
      const modelloaded = await tf.loadLayersModel(
        "signlanguagedetectionmodel48x48.json"
      );
      setModel(modelloaded);
      console.log("Model imported!!!");
    };

    loadModel();
  }, []);

  return (
    <div>
      <h1>Sign Language Recognition</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={predictImage}>Predict</button>
      <div>
        <img src={imageSrc} />
      </div>
      <div>
        <h2>{predictedClass}</h2>
        <h2>{accuracy} %</h2>
      </div>
    </div>
  );
}

export default App;
