import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Image, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { StorageService } from '../../lib/storage';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from './Toaster';
import clsx from '../../utils/clsx';

interface FileUploadProps {
  onUploadComplete: (url: string, path: string) => void;
  onUploadError?: (error: string) => void;
  currentImage?: string;
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
  disabled?: boolean;
}

interface UploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
  preview: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  onUploadError,
  currentImage,
  className,
  accept = "image/*",
  maxSize = 10,
  disabled = false
}) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [uploadState, setUploadState] = useState<UploadState>({
    uploading: false,
    progress: 0,
    error: null,
    preview: currentImage || null
  });

  const resetUploadState = useCallback(() => {
    setUploadState(prev => ({
      ...prev,
      uploading: false,
      progress: 0,
      error: null
    }));
  }, []);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!user) {
      addToast('Please sign in to upload files', 'error');
      return;
    }

    // Reset state
    setUploadState(prev => ({
      ...prev,
      uploading: true,
      progress: 0,
      error: null,
      preview: URL.createObjectURL(file)
    }));

    try {
      // Check if storage is available
      const storageAvailable = await StorageService.isStorageAvailable();
      if (!storageAvailable) {
        throw new Error('Storage service is not available. Please check your Supabase configuration.');
      }

      // Upload file
      const result = await StorageService.uploadFile(file, user.id, (progress) => {
        setUploadState(prev => ({ ...prev, progress }));
      });

      if (result.error) {
        throw new Error(result.error);
      }

      // Success
      setUploadState(prev => ({
        ...prev,
        uploading: false,
        progress: 100,
        error: null,
        preview: result.url
      }));

      onUploadComplete(result.url, result.path);
      addToast('File uploaded successfully!', 'success');

    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMessage = error.message || 'Upload failed. Please try again.';
      
      setUploadState(prev => ({
        ...prev,
        uploading: false,
        progress: 0,
        error: errorMessage,
        preview: currentImage || null
      }));

      onUploadError?.(errorMessage);
      addToast(errorMessage, 'error');
    }
  }, [user, onUploadComplete, onUploadError, addToast, currentImage]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      const validation = StorageService.validateFile(file);
      if (!validation.valid) {
        addToast(validation.error || 'Invalid file', 'error');
        return;
      }

      handleFileSelect(file);
    }
  }, [handleFileSelect, addToast]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled || uploadState.uploading) return;

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    if (file) {
      handleFileSelect(file);
    }
  }, [disabled, uploadState.uploading, handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleClick = useCallback(() => {
    if (!disabled && !uploadState.uploading) {
      fileInputRef.current?.click();
    }
  }, [disabled, uploadState.uploading]);

  const handleRemoveImage = useCallback(() => {
    setUploadState(prev => ({
      ...prev,
      preview: null,
      error: null
    }));
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const hasImage = uploadState.preview && !uploadState.error;
  const showProgress = uploadState.uploading && uploadState.progress > 0;

  return (
    <div className={clsx("relative", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="sr-only"
        disabled={disabled || uploadState.uploading}
      />

      {hasImage ? (
        <div className="relative group">
          <div className="relative h-64 w-full overflow-hidden rounded-lg">
            <img
              src={uploadState.preview}
              alt="Upload preview"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                <button
                  onClick={handleClick}
                  disabled={disabled || uploadState.uploading}
                  className="btn-secondary text-sm"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Change
                </button>
                <button
                  onClick={handleRemoveImage}
                  disabled={disabled || uploadState.uploading}
                  className="btn bg-red-500 text-white hover:bg-red-600 text-sm"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </button>
              </div>
            </div>

            {/* Upload Progress */}
            {showProgress && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white">
                  <Loader className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <div className="text-sm">Uploading... {Math.round(uploadState.progress)}%</div>
                  <div className="w-32 h-2 bg-gray-700 rounded-full mt-2">
                    <div 
                      className="h-full bg-primary-500 rounded-full transition-all duration-300"
                      style={{ width: `${uploadState.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Success Indicator */}
          {!uploadState.uploading && !uploadState.error && uploadState.preview && (
            <div className="absolute top-2 right-2">
              <div className="bg-success-500 text-white rounded-full p-1">
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={clsx(
            "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
            disabled || uploadState.uploading
              ? "border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-50"
              : "border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20",
            uploadState.error && "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
          )}
        >
          {uploadState.uploading ? (
            <div className="space-y-4">
              <Loader className="h-12 w-12 text-primary-600 mx-auto animate-spin" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Uploading...
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {Math.round(uploadState.progress)}% complete
                </p>
              </div>
              {showProgress && (
                <div className="w-full max-w-xs mx-auto">
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-primary-500 rounded-full transition-all duration-300"
                      style={{ width: `${uploadState.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {uploadState.error ? (
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
              ) : (
                <Image className="h-12 w-12 text-gray-400 mx-auto" />
              )}
              
              <div>
                {uploadState.error ? (
                  <>
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                      Upload Failed
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                      {uploadState.error}
                    </p>
                    <button
                      onClick={resetUploadState}
                      className="text-xs text-primary-600 dark:text-primary-400 hover:underline mt-2"
                    >
                      Try Again
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      PNG, JPG, GIF up to {maxSize}MB
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {uploadState.error && !uploadState.uploading && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          {uploadState.error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;