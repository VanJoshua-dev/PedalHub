import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";
function OrderList() {
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState(null);
  const handleDisplay = () => {
    // Just set the image URL — no Axios needed
    setImage("http://localhost:5000/api/uploads/mylogo.png");
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const url = URL.createObjectURL(selected);
      setPreview(url);
      setFile(selected); // store file for upload
    }
  };

  const handleUploadImage = async () => {
    if (!file) {
      alert("Please choose an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Backend should return the saved image URL
      setImage(res.data.fileUrl);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check the console for details.");
    }
  };
  return (
    <div className="flex flex-row items-center gap-22">
      <div>
        {image && <img src={image} alt="logo" />}
        <button onClick={handleDisplay} className="py-2 px-3">
          Display Image
        </button>
      </div>
      <form onClick={handleUploadImage}>
        <label
          htmlFor="file_upload"
          className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain rounded-2xl"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <FiUploadCloud className="text-4xl" />
              <p className="text-sm">Click to upload image</p>
            </div>
          )}
        </label>

        <input
          type="file"
          id="file_upload"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div>
          <button
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Upload Image
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderList;
