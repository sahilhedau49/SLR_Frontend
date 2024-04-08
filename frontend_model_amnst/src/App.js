import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Model from "./Model";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Model />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
