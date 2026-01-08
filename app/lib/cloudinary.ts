import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

/**
 * Upload a file to Cloudinary
 * @param file - File buffer
 * @param folder - Folder name in Cloudinary (optional)
 * @param resourceType - Resource type: 'image', 'video', 'raw', 'auto' (default: 'auto')
 * @returns Promise with upload result containing secure_url
 */
export async function uploadToCloudinary(
  file: Buffer,
  folder: string = 'naeees-materials',
  resourceType: 'image' | 'video' | 'raw' | 'auto' = 'auto'
): Promise<{ secure_url: string; public_id: string; format: string; bytes: number }> {
  return new Promise((resolve, reject) => {
    // Check if config exists
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("Cloudinary Env Vars Missing!");
      return reject(new Error("Cloudinary configuration missing. Please check .env file."));
    }

    const uploadOptions: any = {
      folder,
      resource_type: resourceType,
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      // Ensure files are publicly accessible
      access_mode: 'public' as const,
    };

    // For raw files (PDFs, documents), ensure no processing or transformations
    if (resourceType === 'raw') {
      // Don't apply any transformations or processing
      uploadOptions.format = undefined;
      uploadOptions.eager = undefined;
      uploadOptions.transformation = undefined;
      // Ensure the file is stored as-is without any conversion
      uploadOptions.invalidate = false;
      // Don't generate any derived resources
      uploadOptions.eager_async = false;
    }

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Stream Error:", error);
          reject(error);
        } else if (result) {
          resolve({
            secure_url: result.secure_url || '',
            public_id: result.public_id || '',
            format: result.format || '',
            bytes: result.bytes || 0,
          });
        } else {
          reject(new Error('Upload failed: No result returned'));
        }
      }
    );

    stream.on("error", (err) => {
      console.error("Stream Connection Error", err);
      reject(err);
    });

    try {
      stream.end(file);
    } catch (err) {
      console.error("Stream Write Error", err);
      reject(err);
    }
  });
}

/**
 * Delete a file from Cloudinary
 * @param publicId - Public ID of the file to delete
 * @param resourceType - Resource type (default: 'auto')
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' | 'auto' = 'auto'
): Promise<void> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, { resource_type: resourceType }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

export { cloudinary };

