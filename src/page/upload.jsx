import { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [files, setFiles] = useState({
    images: null,
    audioFiles: null,
    excelFile: null,
  });
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [parts, setParts] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);

  const handleChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles({
      ...files,
      [name]: selectedFiles,
    });
  };

  const handleTypeChange = (e) => setType(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleNumberOfQuestionsChange = (e) =>
    setNumberOfQuestions(e.target.value);

  const handlePartChange = (e) => {
    const value = e.target.value;
    setParts(
      (prevParts) =>
        e.target.checked
          ? [...prevParts, value] // Thêm nếu được chọn
          : prevParts.filter((part) => part !== value) // Loại bỏ nếu bỏ chọn
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!type || !title || parts.length === 0) {
      alert("Please fill in all required fields!");
      return;
    }

    const formData = new FormData();
    if (files.images) {
      Array.from(files.images).forEach((file) =>
        formData.append("images", file)
      );
    }
    if (files.audioFiles) {
      Array.from(files.audioFiles).forEach((file) =>
        formData.append("audioFiles", file)
      );
    }
    if (files.excelFile) {
      formData.append("excelFile", files.excelFile[0]);
    }

    formData.append("type", type);
    formData.append("title", title);
    formData.append("parts", JSON.stringify(parts)); // Gửi mảng `parts` dưới dạng chuỗi
    formData.append("numberOfQuestions", numberOfQuestions);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/test",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>

      <div>
        <label>Test Type</label>
        <select value={type} onChange={handleTypeChange}>
          <option value="" disabled>
            Select a test type
          </option>
          <option value="exam">Exam</option>
          <option value="miniexam">Mini Exam</option>
          <option value="reading">Reading</option>
          <option value="listening">Listening</option>
        </select>
      </div>

      <div>
        <label>Images</label>
        <input
          type="file"
          name="images"
          onChange={handleChange}
          accept="image/*"
          multiple
          webkitdirectory="true"
        />
      </div>

      <div>
        <label>Audio Files</label>
        <input
          type="file"
          name="audioFiles"
          onChange={handleChange}
          accept="audio/*"
          multiple
          webkitdirectory="true"
        />
      </div>

      <div>
        <label>Excel File</label>
        <input
          type="file"
          name="excelFile"
          onChange={handleChange}
          accept=".xls,.xlsx"
        />
      </div>

      <div>
        <label>Number of Questions</label>
        <input
          type="number"
          value={numberOfQuestions}
          onChange={handleNumberOfQuestionsChange}
        />
      </div>

      <div>
        <label>Parts</label>
        <div>
          {["1", "2", "3", "4", "5", "6", "7"].map((part) => (
            <label key={part}>
              <input
                type="checkbox"
                value={part}
                checked={parts.includes(part)}
                onChange={handlePartChange}
              />
              Part {part}
            </label>
          ))}
        </div>
      </div>

      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
