import { useState, useCallback , useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext"; // ✅ Import user auth context

import MovieSideBar from "./movieSidebar.jsx";

export default function ProfilePicUpload() {
  const { uploadProfilePicture } = UserAuth(); // ✅ Supabase Upload Function
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) {
      setError("No file selected.");
      return;
    }

    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      setError("Invalid file type. Please upload PNG or JPEG.");
      return;
    }

    setError("");
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // Show preview
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpeg", ".jpg"] }, // Only allow images
    multiple: false, // Only one file
  });

  // Handle Upload to Supabase
  const handleSave = async () => {
    if (!selectedFile) {
      setError("Please select a file before saving.");
      return;
    }

    setLoading(true);

    try {
      const result = await uploadProfilePicture(selectedFile); // ✅ Upload to Supabase

      if (result.success) {
        console.log("Upload successful:", result.url);
        navigate("/"); // ✅ Redirect after successful upload
      } else {
        setError(result.error || "Upload failed.");
      }
    } catch (err) {
      setError("An error occurred during upload.");
      console.error(err);
    }

    setLoading(false);
  };

  // Skip button
  const handleSkip = () => {
    navigate("/");
  };

  return (

    <div className="flex justify-center object-fill fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gradient-to-b from-[#000000] to-[#14213d] min-h-screen text-white">
      <div className="flex flex-col items-center justify-center top-0 w-3/4 h-screen my-4 mx-4 content-center">
      <h1 className="text-4xl font-extrabold">NextPick</h1>
      <p className="text-xs mt-1 font-light">Your Personal Movie Genie!</p>

      <h1 className="text-xl mt-10 mb-8 text-left px-[20%] font-bold">You are almost there, Upload your profile pic to get started </h1>

        <div
          {...getRootProps()}
          className={`w-80 h-80 border-2 border-dashed   flex items-center justify-center cursor-pointer rounded-lg 
          ${isDragActive ? "border-blue-400 bg-gray-800" : "border-[#fca311]"}
        `}
        >
          <input {...getInputProps()} />
          {preview ? (
            <img
              src={preview}
              alt="Profile Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-center text-[#fca311]">
              Drag & drop your profile picture here, or click to select
            </p>
          )}
        </div>

        {error && <p className="text-red-400 mt-2">{error}</p>}

        <div className="mt-4 flex justify-between">
          <button
            onClick={handleSkip}
            className="px-11 py-2 mr-5 bg-transparent border-2 border-[#fca311] text-[#fca311] rounded-md font-semibold transition duration-300 hover:scale-110"
          >
            Skip
          </button>
          <button
            onClick={handleSave}
            className="px-11 py-2 ml-5 bg-[#fca311] text-black rounded-md hover:bg-[#ffb627] transition duration-300 hover:scale-110"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
          <MovieSideBar />
    </div>

  );
}
