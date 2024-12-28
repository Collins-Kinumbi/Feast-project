import cloudinary from "cloudinary";

// Utility to clean up uploaded images
export async function cleanupImage(publicId) {
  if (!publicId) return; // Ensure a public ID is provided
  await cloudinary.v2.uploader.destroy(publicId);
}
