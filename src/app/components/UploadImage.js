"use client";

import { useState } from "react";

export default function UploadImage({ setAvatarUrl }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file)); // Show preview before upload
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setLoading(false);

    if (data.url) {
      setAvatarUrl(data.url); // Save uploaded image URL
    } else {
      alert("Upload failed!");
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
    
      {preview && <img src={preview} alt="Preview" width="100" />}
      {loading && <p>Uploading...</p>}
    </div>
  );
}
