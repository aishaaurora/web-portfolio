export const CLOUDINARY_CLOUD_NAME = "reuaj9a";

/**
 * Wraps an image URL with Cloudinary's Fetch API for automatic format conversion (f_auto)
 * and intelligent compression (q_auto).
 * 
 * Uses encodeURIComponent so AWS S3 presigned URLs with special characters and
 * ampersands (&) do not break the Cloudinary fetch request.
 *
 * @param {string} originalImageUrl
 * @returns {string} Optimized Cloudinary URL or original URL
 */
export const getOptimizedImageUrl = (originalImageUrl) => {
  if (!originalImageUrl) return "";

  // Only wrap remote HTTP/HTTPS URLs (such as Notion AWS S3 or external URLs)
  if (originalImageUrl.startsWith("http://") || originalImageUrl.startsWith("https://")) {
    if (originalImageUrl.includes("res.cloudinary.com")) {
      return originalImageUrl;
    }
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/f_auto,q_auto/${encodeURIComponent(originalImageUrl)}`;
  }

  return originalImageUrl;
};
