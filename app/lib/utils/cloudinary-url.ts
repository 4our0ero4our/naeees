/**
 * Fix Cloudinary URL if it was uploaded with wrong resource type
 * Converts /image/upload/ URLs to /raw/upload/ for document files
 * This is a client-safe utility function (no Node.js dependencies)
 * @param url - The Cloudinary URL
 * @returns The corrected URL
 */
export function fixCloudinaryUrl(url: string): string {
  if (!url) return url;
  
  // If URL contains /image/upload/ and ends with .pdf, .doc, .docx, .ppt, .pptx
  // Convert it to /raw/upload/
  const documentExtensions = /\.(pdf|doc|docx|ppt|pptx)$/i;
  if (url.includes('/image/upload/') && documentExtensions.test(url)) {
    return url.replace('/image/upload/', '/raw/upload/');
  }
  
  return url;
}

