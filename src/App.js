import axios from "axios";
import Search from "./pages/search";
import Table from "./pages/table";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

function App() {
  // axios.defaults.baseURL = "http://localhost:5001/search";
  axios.defaults.withCredentials=true
  axios.defaults.baseURL = "https://wordcount-z0dq.onrender.com/search";
  return (
    <div className="App bg-white">
      {/* <ToastContainer autoClose='2000' position="top-right" /> */}
      <Toaster
  position="top-right"
  reverseOrder={false}
/>

      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </div>
  );
}

export default App;
