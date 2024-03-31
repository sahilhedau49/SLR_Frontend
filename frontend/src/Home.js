import React from "react";
import { Link } from "react-router-dom";
import SLRimg1 from "./assets/slr_img1.jpeg";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-16">
        <div className="flex flex-col w-[60%] mx-auto items-center justify-center">
          <h1 className="text-4xl font-semibold text-center mb-8">
            Welcome to Sign Language Recognition
          </h1>
          <p className="text-lg text-gray-700 text-center mb-8">
            Communication is a fundamental human right, yet for the deaf and
            dumb community, traditional modes of expression face significant
            barriers.
          </p>
          <p className="text-lg text-gray-700 text-center mb-8">
            One of the ways to communicate with deaf and dumb individuals is
            through sign language. So, to speak with deaf and dumb people, one
            should learn sign language; yet, because not everyone can learn it,
            communication becomes nearly impossible. The goal of this study is
            to use machine learning to break through these communication
            hurdles. Most existing technologies rely on external sensors, which
            are out of reach for most people. Utilizing deep learning approaches
            has become standard for improving the recognition accuracy of sign
            language models. Using Convolutional Neural Network, a CNN model can
            be applied for hand recognition in the data image.
          </p>
          <img
            src={SLRimg1}
            alt="Sign Language Recognition"
            className="mb-8 rounded-lg shadow-md"
          />
          <p className="text-lg text-gray-700 text-center mb-8">
            Sign Language Recognition (SLR) is a technology that enables
            communication between deaf or hard-of-hearing individuals and the
            rest of the world. By recognizing hand gestures and translating them
            into text or speech, SLR bridges the communication gap.
          </p>

          <p className="text-lg text-gray-700 text-center mb-8">
            Our SLR model utilizes advanced machine learning techniques to
            accurately interpret sign language gestures in real-time. Whether
            you're learning sign language, communicating with deaf individuals,
            or developing accessibility solutions, SLR can be an invaluable
            tool.
          </p>
          <Link
            to="/model"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
          >
            Try Our Model
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
