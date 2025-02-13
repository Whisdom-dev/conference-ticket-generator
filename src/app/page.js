"use client"; // Required for Next.js 15

import { useState } from "react";
import TicketForm from "./components/TicketForm";
import UploadImage from "./components/UploadImage"; // Import the Cloudinary Upload component

export default function HomePage() {
  const [avatarUrl, setAvatarUrl] = useState(""); // Store uploaded image URL

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Conference Ticket Generator</h1>

      {/* Cloudinary Image Upload Component */}
      <UploadImage setAvatarUrl={setAvatarUrl} />

      {/* Pass the uploaded image URL to TicketForm */}
      <TicketForm avatarUrl={avatarUrl} />
    </main>
  );
}
