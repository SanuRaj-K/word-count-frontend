import axios from "axios";
import Search from "./pages/search";
import Table from "./pages/table";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  axios.defaults.baseURL = "http://localhost:5001/";
  return (
    <div className="App bg-white">
      <ToastContainer position="top-right" />

      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </div>
  );
}

export default App;