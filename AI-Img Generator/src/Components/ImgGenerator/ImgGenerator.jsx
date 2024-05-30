import React, { useRef, useState } from "react";
import "./ImgGenerator.css";
import default_img from "../Assets/default_img.jpg";

function ImgGenerator() {
  const [image_url, setImg_url] = useState("/");
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return ;
    }
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer sk-proj-Z8lz0pPuwtEPQhSkQXphT3BlbkFJ69HQotLnFDeZouZKAUH", // Replace with your actual API key
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    let data_array = data.data;
    setImg_url(data_array[0].url);
    
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI-Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="img">
          <img src={image_url === "/" ? default_img : image_url} alt="" />
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what you want to see"
        />
        <div
          className="search-btn"
          onClick={() => {
            imageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
}

export default ImgGenerator;
