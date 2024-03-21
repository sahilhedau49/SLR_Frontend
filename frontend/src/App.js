import { useEffect, useState } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import "./wordsmodel48x48.json";

function App() {
  const [model, setModel] = useState();

  useEffect(() => {
    const loadModel = async () => {
      const modelloaded = await tf.loadLayersModel("wordsmodel48x48.json");
      setModel(modelloaded);
    };

    loadModel();
  }, []);

  const performInference = async () => {
    // Get input data for inference
    const imageData = tf.tensor("../inputs/yes1.jpg");

    const inputWidth = 48;
    const inputHeight = 48;

    // Convert the image data to a TensorFlow.js tensor
    const inputTensor = tf.browser
      .fromPixels(imageData)
      .toFloat()
      .div(tf.scalar(255));

    // Resize the tensor to 48x48 pixels using bilinear interpolation
    const resizedTensor = tf.image.resizeBilinear(inputTensor, [
      inputWidth,
      inputHeight,
    ]);

    // Reshape the tensor to match the input shape expected by your model
    const reshapedTensor = resizedTensor.reshape([
      1,
      inputWidth,
      inputHeight,
      3,
    ]);

    // Make predictions
    const predictions = model.predict(reshapedTensor);

    console.log(predictions);
    // Process the predictions as needed
    // ...
  };

  return (
    <div>
      <p> Hello World </p>
      <button onClick={() => performInference}>Predict</button>
    </div>
  );
}

export default App;
