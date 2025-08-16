// pages/admin/upload.js
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);

  async function handleUpload() {
    if (!file) return alert("Select a file first");
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "auto_supabase");
    // Optionally add tags/context:
    form.append("tags", "Kitchen,Design");
    form.append("context", "custom=description=Kitchen Example");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      { method: "POST", body: form }
    );
    const data = await res.json();
    alert("Uploaded: " + data.secure_url);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Upload</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload to Cloudinary</button>
    </div>
  );
}