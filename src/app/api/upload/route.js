
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_dfdmztklk,
  api_key: process.env.CLOUDINARY_621156558386222,
  api_secret: process.env.CLOUDINARY_LHUdYBO-YsKouryglhrSZf9Gk0E,
});

export async function POST(req) {
  try {
    const form = new IncomingForm();
    form.uploadDir = "/tmp"; // Temporary storage
    form.keepExtensions = true;
    
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const file = data.files.image;
    if (!file) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: "avatars",
    });

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
