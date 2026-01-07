/**
 * Fix Cloudinary URL if it was uploaded with wrong resource type
 * Converts /image/upload/ URLs to /raw/upload/ for document files
 * Also ensures no transformations are applied - gets the original file
 * This is a client-safe utility function (no Node.js dependencies)
 * @param url - The Cloudinary URL
 * @returns The corrected URL pointing to the original file
 */
export function fixCloudinaryUrl(url: string): string {
  if (!url) return url;

  // Cloudinary URL structure: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/v{version}/{public_id}
  // We need to preserve the cloud_name and only fix the resource_type and remove transformations

  // If URL contains /image/upload/ and ends with .pdf, .doc, .docx, .ppt, .pptx
  // Convert it to /raw/upload/
  const documentExtensions = /\.(pdf|doc|docx|ppt|pptx)$/i;
  if (url.includes('/image/upload/') && documentExtensions.test(url)) {
    url = url.replace('/image/upload/', '/raw/upload/');
  }

  // For raw files, ensure we get the original file without any transformations
  // But preserve the cloud_name and proper URL structure
  if (url.includes('/raw/upload/') || url.includes('/image/upload/')) {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;

      // Split pathname: /{cloud_name}/{resource_type}/upload/{transformations}/{version}/{public_id}
      const parts = pathname.split('/').filter(part => part !== ''); // Remove empty strings

      // Find the upload index
      const uploadIndex = parts.findIndex(part => part === 'upload');

      if (uploadIndex !== -1 && uploadIndex > 0) {
        // cloud_name is at index 0
        // resource_type is at index 1 (should be 'raw' or 'image')
        // 'upload' is at uploadIndex
        const cloudName = parts[0];
        const resourceType = parts[1];

        // Get everything after 'upload'
        const afterUpload = parts.slice(uploadIndex + 1);

        // Filter out transformation flags but keep version numbers (v1234567890) and file path
        const transformationPatterns = /^(q|f|fl|w|h|c|g|a|b|dpr|e|o|r|t|u|x|y|z)_/;
        const cleanParts = afterUpload.filter(part => {
          // Keep version numbers (v followed by digits) and actual file paths
          // Remove transformation flags (but not version numbers)
          if (/^v\d+$/.test(part)) return true; // Keep version numbers
          return !transformationPatterns.test(part);
        });

        // Rebuild the path preserving cloud_name and using 'raw' resource type
        // Force attachment download by adding fl_attachment
        urlObj.pathname = `/${cloudName}/raw/upload/fl_attachment/${cleanParts.join('/')}`;
        url = urlObj.toString();
      }
    } catch (e) {
      // If URL parsing fails, just do a simple replacement if needed
      console.warn('Failed to parse Cloudinary URL:', e);
      // Fallback: just ensure /raw/upload/ is used instead of /image/upload/
      if (url.includes('/image/upload/') && documentExtensions.test(url)) {
        // Try to preserve the cloud_name by doing a more careful replacement
        url = url.replace(/\/(image|raw)\/upload\//, '/raw/upload/');
      }
    }
  }

  return url;
}
