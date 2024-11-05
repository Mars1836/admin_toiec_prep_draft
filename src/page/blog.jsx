import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import DOMPurify from "dompurify";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code-block", // Thêm để hỗ trợ khối mã
  "video", // Thêm để hỗ trợ video
  "formula", // Thêm để hỗ trợ công thức
  "background", // Thêm để thay đổi màu nền
  "font", // Thêm để chọn phông chữ
  "align", // Thêm để căn chỉnh văn bản
];
function BlogPage() {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <>
      <div>
        <div>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={setValue}
          ></ReactQuill>
        </div>
        <div>
          {
            <div
              className="ql-container"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
            />
          }
        </div>
      </div>
    </>
  );
}

export default BlogPage;
