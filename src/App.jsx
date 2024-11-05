import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogPage from "./page/blog";
import UploadPage from "./page/upload";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/blog" Component={BlogPage} />{" "}
          {/* 👈 Renders at /app/ */}
          <Route path="/upload" Component={UploadPage} />{" "}
          {/* 👈 Renders at /app/ */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
