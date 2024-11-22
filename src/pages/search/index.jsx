import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const Search = () => {
  const [domainName, setDomainName] = useState("");
  const navigate = useNavigate();

  const handleGetInsights = () => {
    const toastId = toast.loading("Loading...");
  
    if (domainName.length < 1) {
      toast.error("Please enter your URL", { id: toastId });
      toast.dismiss(toastId); 
    } else {
      const regex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!regex.test(domainName)) {
        toast.error("Invalid URL. Please enter a valid domain name.", {
          id: toastId,
        });
        toast.dismiss(toastId); 
        return;
      }
    }
  
    axios
      .post("/add", { domainName })
      .then((res) => {
        if (res.status === 200) {
          toast.dismiss(toastId); 
          navigate("/table");
        } else {
          toast.error("Something went wrong...", { id: toastId });
          toast.dismiss(toastId); 
        }
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Domain name is already searched", { id: toastId });
        toast.dismiss(toastId); 
      });
  };
  
  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <div className=" shadow-lg p-5 w-[600px] mx-auto flex-initial items-center justify-center flex-col">
        <input
          type="text"
          value={domainName}
          required
          onChange={(e) => setDomainName(e.target.value)}
          placeholder="https://www.yourURL.com"
          className="input   input-bordered input-secondary w-full  "
        />
        <div onClick={handleGetInsights} className=" flex justify-center mt-4">
          <button className="btn btn-outline btn-secondary">
            Get insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
