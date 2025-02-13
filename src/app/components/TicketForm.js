"use client"; // Required for client-side hooks

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TicketPreview from "./TicketPreview";

// Form validation schema
const ticketSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email format"),
  avatarUrl: z.string().url("Invalid image URL"),
});

export default function TicketForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ticketSchema),
  });

  const [ticketData, setTicketData] = useState(null);

  // Clear saved data on refresh
  useEffect(() => {
    localStorage.removeItem("ticketData"); // Remove stored ticket data
    setTicketData(null); // Reset state
  }, []);

  const onSubmit = (data) => {
    setTicketData(data);
    localStorage.setItem("ticketData", JSON.stringify(data)); // Save to local storage
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-bold">Full Name</label>
          <input {...register("fullName")} className="border p-2 w-full rounded" />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold">Email Address</label>
          <input {...register("email")} className="border p-2 w-full rounded" type="email" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold">Avatar URL (Cloudinary)</label>
          <input {...register("avatarUrl")} className="border p-2 w-full rounded" />
          {errors.avatarUrl && <p className="text-red-500 text-sm">{errors.avatarUrl.message}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Generate Ticket
        </button>
      </form>

      {ticketData && <TicketPreview {...ticketData} />}
    </div>
  );
}
