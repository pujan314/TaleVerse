import { supabase } from './supabase';

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

export class StorageService {
  private static readonly BUCKET_NAME = 'cover-images';
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static readonly ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  /**
   * Validate file before upload
   */
  static validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > this.MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size must be less than ${this.MAX_FILE_SIZE / (1024 * 1024)}MB`
      };
    }

    // Check file type
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: 'File must be an image (JPEG, PNG, GIF, or WebP)'
      };
    }

    return { valid: true };
  }

  /**
   * Generate unique file path
   */
  static generateFilePath(file: File, userId: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    
    return `${userId}/${timestamp}-${randomString}.${fileExtension}`;
  }

  /**
   * Upload file to Supabase Storage
   */
  static async uploadFile(file: File, userId: string, onProgress?: (progress: number) => void): Promise<UploadResult> {
    try {
      // Validate file
      const validation = this.validateFile(file);
      if (!validation.valid) {
        return { url: '', path: '', error: validation.error };
      }

      // Generate unique file path
      const filePath = this.generateFilePath(file, userId);

      // Upload file
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        return { url: '', path: '', error: error.message };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(filePath);

      if (!urlData.publicUrl) {
        return { url: '', path: '', error: 'Failed to get public URL' };
      }

      return {
        url: urlData.publicUrl,
        path: filePath
      };

    } catch (error: any) {
      console.error('Upload error:', error);
      return { url: '', path: '', error: error.message || 'Upload failed' };
    }
  }

  /**
   * Delete file from storage
   */
  static async deleteFile(filePath: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([filePath]);

      if (error) {
        console.error('Delete error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Delete error:', error);
      return { success: false, error: error.message || 'Delete failed' };
    }
  }

  /**
   * Get optimized image URL with transformations
   */
  static getOptimizedImageUrl(url: string, options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  }): string {
    if (!url || !url.includes('supabase')) {
      return url;
    }

    const params = new URLSearchParams();
    
    if (options?.width) params.append('width', options.width.toString());
    if (options?.height) params.append('height', options.height.toString());
    if (options?.quality) params.append('quality', options.quality.toString());
    if (options?.format) params.append('format', options.format);

    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  /**
   * Upload multiple files
   */
  static async uploadMultipleFiles(
    files: File[], 
    userId: string, 
    onProgress?: (fileIndex: number, progress: number) => void
  ): Promise<UploadResult[]> {
    const results: UploadResult[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await this.uploadFile(file, userId, (progress) => {
        onProgress?.(i, progress);
      });
      results.push(result);
    }

    return results;
  }

  /**
   * Check if storage is available
   */
  static async isStorageAvailable(): Promise<boolean> {
    try {
      const { data, error } = await supabase.storage.listBuckets();
      return !error && Array.isArray(data);
    } catch (error) {
      console.error('Storage availability check failed:', error);
      return false;
    }
  }
}