// UploadForm.js
import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [files, setFiles] = useState({
    images: null,
    audioFiles: null,
    excelFile: null,
  });
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles({
      ...files,
      [name]: selectedFiles,
    });
  };
  const typeChange = (e) => {
    setType(e.target.value);
  };
  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (files.images) {
      for (let i = 0; i < files.images.length; i++) {
        formData.append("images", files.images[i]);
      }
    }
    if (files.audioFiles) {
      for (let i = 0; i < files.audioFiles.length; i++) {
        formData.append("audioFiles", files.audioFiles[i]);
      }
    }
    if (files.excelFile) {
      formData.append("excelFile", files.excelFile[0]);
    }
    formData.append("type", type);
    formData.append("title", title);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/pub/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <label htmlFor="">Title</label>
        <input type="text" onChange={titleChange} name="tile" />
      </div>
      <div className="">
        <label htmlFor="">
          {" "}
          <select onChange={typeChange} defaultValue="">
            <option value="" disabled>
              Select a test type
            </option>
            <option key={type} value={"exam"}>
              exam
            </option>
            <option key={type} value={"miniexam"}>
              mini exam
            </option>
            <option key={type} value={"reading"}>
              reading
            </option>
            <option key={type} value={"listening"}>
              listening
            </option>
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="">Image</label>
        <input
          type="file"
          name="images"
          multiple
          webkitdirectory="true"
          onChange={handleChange}
          accept="image/*"
        />
      </div>
      <div>
        <label htmlFor="">Audio</label>
        <input
          type="file"
          name="audioFiles"
          multiple
          onChange={handleChange}
          webkitdirectory="true"
          accept="audio/*"
        />
      </div>
      <div>
        <label htmlFor="">excel</label>
        <input
          type="file"
          name="excelFile"
          onChange={handleChange}
          accept=".xls,.xlsx"
        />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
