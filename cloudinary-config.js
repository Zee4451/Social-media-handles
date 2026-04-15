/**
 * Cloudinary Configuration Module
 * 
 * Handles Cloudinary uploads, transformations, and media management.
 * Replaces Firebase Storage with a simpler, more reliable solution.
 * 
 * @module cloudinary-config
 */

// Cloudinary Configuration
export const cloudinaryConfig = {
    cloudName: 'dzb4klhd8',
    apiKey: '322962445971584',
    apiSecret: 'iHCI5HEaJ-TJ3D5zQnZtkhJdNII', // Note: Keep this secure!
    uploadPreset: 'sfactor_gallery' // We'll create this
};

/**
 * Upload file to Cloudinary
 * 
 * @async
 * @function uploadToCloudinary
 * @param {File} file - File to upload
 * @param {string} folder - Folder name (gallery, videos, posters)
 * @param {function} onProgress - Progress callback (optional)
 * @returns {Promise<string>} Secure URL of uploaded file
 * 
 * @example
 * const url = await uploadToCloudinary(file, 'gallery');
 */
export async function uploadToCloudinary(file, folder = 'gallery', onProgress = null) {
    try {
        // Create form data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);
        formData.append('folder', `sfactor/${folder}`);
        
        // Optional: Add tags for organization
        const fileType = file.type.startsWith('video') ? 'video' : 'image';
        formData.append('tags', `sfactor,${fileType},${folder}`);
        
        // Upload to Cloudinary
        const uploadURL = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/auto/upload`;
        
        const xhr = new XMLHttpRequest();
        
        // Track upload progress
        if (onProgress) {
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percentComplete = Math.round((e.loaded / e.total) * 100);
                    onProgress(percentComplete);
                }
            });
        }
        
        // Return promise
        return new Promise((resolve, reject) => {
            xhr.open('POST', uploadURL, true);
            
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    console.log('Upload successful:', response.secure_url);
                    resolve(response.secure_url);
                } else {
                    const error = JSON.parse(xhr.responseText);
                    console.error('Upload failed:', error);
                    reject(new Error(error.error?.message || 'Upload failed'));
                }
            };
            
            xhr.onerror = function() {
                reject(new Error('Network error during upload'));
            };
            
            xhr.send(formData);
        });
        
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
}

/**
 * Get Cloudinary image URL with transformations
 * 
 * @function getTransformedImageURL
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} transformations - Transformation options
 * @returns {string} Transformed image URL
 * 
 * @example
 * const url = getTransformedImageURL('gallery/photo', { width: 800, quality: 'auto' });
 */
export function getTransformedImageURL(publicId, transformations = {}) {
    const baseURL = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/`;
    
    // Build transformation string
    const transforms = [];
    
    if (transformations.width) transforms.push(`w_${transformations.width}`);
    if (transformations.height) transforms.push(`h_${transformations.height}`);
    if (transformations.quality) transforms.push(`q_${transformations.quality}`);
    if (transformations.crop) transforms.push(`c_${transformations.crop}`);
    if (transformations.format) transforms.push(`f_${transformations.format}`);
    
    const transformString = transforms.length > 0 ? transforms.join(',') + '/' : '';
    
    return `${baseURL}${transformString}${publicId}`;
}

/**
 * Get Cloudinary video URL with transformations
 * 
 * @function getTransformedVideoURL
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} transformations - Transformation options
 * @returns {string} Transformed video URL
 */
export function getTransformedVideoURL(publicId, transformations = {}) {
    const baseURL = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/video/upload/`;
    
    const transforms = [];
    
    if (transformations.width) transforms.push(`w_${transformations.width}`);
    if (transformations.height) transforms.push(`h_${transformations.height}`);
    if (transformations.quality) transforms.push(`q_${transformations.quality}`);
    if (transformations.bitRate) transforms.push(`br_${transformations.bitRate}`);
    
    const transformString = transforms.length > 0 ? transforms.join(',') + '/' : '';
    
    return `${baseURL}${transformString}${publicId}`;
}

/**
 * Delete file from Cloudinary (requires server-side for security)
 * Note: For security, deletion should be done server-side
 * This is a placeholder for future implementation
 * 
 * @function deleteFromCloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<boolean>} Success status
 */
export async function deleteFromCloudinary(publicId) {
    console.warn('Deletion requires server-side implementation for security');
    console.log('Public ID to delete:', publicId);
    
    // For now, return false
    // In production, call your backend API to delete
    return false;
}

/**
 * Validate file before upload
 * 
 * @function validateFile
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export function validateFile(file, options = {}) {
    const maxSize = options.maxSize || 50 * 1024 * 1024; // 50MB default
    const allowedTypes = options.allowedTypes || [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'video/mp4',
        'video/webm',
        'video/quicktime'
    ];
    
    // Check file size
    if (file.size > maxSize) {
        return {
            valid: false,
            error: `File size exceeds maximum (${maxSize / 1024 / 1024}MB)`
        };
    }
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'File type not supported'
        };
    }
    
    return {
        valid: true,
        error: null
    };
}

/**
 * Get file type from file
 * 
 * @function getFileType
 * @param {File} file - File to check
 * @returns {string} 'image' or 'video'
 */
export function getFileType(file) {
    if (file.type.startsWith('image')) return 'image';
    if (file.type.startsWith('video')) return 'video';
    return 'unknown';
}

/**
 * Generate unique public ID for Cloudinary
 * 
 * @function generatePublicId
 * @param {string} folder - Folder name
 * @param {string} originalFilename - Original filename
 * @returns {string} Unique public ID
 */
export function generatePublicId(folder, originalFilename) {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const extension = originalFilename.split('.').pop();
    const name = originalFilename.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_');
    
    return `sfactor/${folder}/${timestamp}_${randomId}_${name}`;
}
