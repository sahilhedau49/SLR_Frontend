import { useEffect, useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import Chart from "chart.js/auto";

function ModelPage() {
  const [imageUrl, setImageUrl] = useState();
  const [model, setModel] = useState();
  const [imageSrc, setImageSrc] = useState(null);
  const [predictedClass, setPredictedClass] = useState("Null");
  const [accuracy, setAccuracy] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  const preprocessImage = (image) => {
    const resizedImage = tf.image.resizeBilinear(image, [224, 224]);
    const normalizedImage = resizedImage.div(255.0);
    const expandedImage = normalizedImage.expandDims(0);
    return expandedImage;
  };

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
    if (!imageLoaded) {
      return;
    }
    const preprocessedImage = await loadImageAndPreprocess(imageUrl);
    const predictions = await model.predict(preprocessedImage);
    const predictionsData = predictions.dataSync();
    const classLabels = [
      "Yes",
      "No",
      "More",
      "I Love You",
      "Home",
      "Hello",
      "Bathroom",
    ];

    const chartData = classLabels.map((label, index) => {
      return {
        label: label,
        value: predictionsData[index] * 100,
      };
    });

    setPredictedClass(
      classLabels[predictionsData.indexOf(Math.max(...predictionsData))]
    );
    setAccuracy(Math.max(...predictionsData) * 100);

    renderChart(chartData);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageUrl(e.target.files[0]);
      setImageLoaded(false); // Reset imageLoaded state when new image is selected
      setPredictedClass("Null"); // Reset predictedClass state when new image is selected
      setAccuracy(0); // Reset accuracy state when new image is selected
    }
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

  useEffect(() => {
    if (imageUrl) {
      loadImageAndPreprocess(imageUrl)
        .then(() => {
          setImageLoaded(true);
        })
        .catch((error) => {
          console.error("Error loading image:", error);
        });
    }
  }, [imageUrl]);

  const renderChart = (data) => {
    if (!chartInstance.current) {
      const ctx = chartContainer.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.map((item) => item.label),
          datasets: [
            {
              label: "Prediction Percentage",
              data: data.map((item) => item.value),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Percentage",
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      chartInstance.current.data.labels = data.map((item) => item.label);
      chartInstance.current.data.datasets[0].data = data.map(
        (item) => item.value
      );
      chartInstance.current.update();
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-10">
        Sign Language Recognition
      </h1>
      <div className="flex justify-center mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border rounded-lg py-2 px-4 mr-4"
        />
        <button
          onClick={predictImage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Predict
        </button>
      </div>
      {imageSrc && (
        <div className="flex justify-center mb-4">
          <img
            src={imageSrc}
            alt="Sign Language"
            className="max-w-md rounded-lg shadow-md"
          />
        </div>
      )}
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold">
          Predicted Class: {predictedClass}
        </h2>
        <h2 className="text-xl">Accuracy: {accuracy.toFixed(2)} %</h2>
      </div>
      <div className="flex justify-center">
        <canvas
          ref={chartContainer}
          style={{ width: "50%", height: "300px" }}
        ></canvas>
      </div>
    </div>
  );
}

export default ModelPage;
