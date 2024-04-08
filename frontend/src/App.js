import { BrowserRouter, Route, Routes } from "react-router-dom";
import ModelPage from "./ModelPage";
import Home from "./Home";
import Navbar from "./Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/words" element={<ModelPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
