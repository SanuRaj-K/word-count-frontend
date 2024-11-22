import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Search = () => {
  const [domainName, setDomainName] = useState("");
  const navigate = useNavigate();

  const handleGetInsights = () => {
    if (domainName.length < 1) {
      toast.error("Please enter your URL");
    } else  {
      const regex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!regex.test(domainName)) {
        toast.error("Invalid URL. Please enter a valid domain name.");
        return;
      }
    }

    axios
      .post("/add", { domainName })
      .then((res) => {
        if (res.status === 200) {
          navigate("/table");
        } else {
          toast.error("something went wrong...");
        }
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Domain name is already searched");
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
