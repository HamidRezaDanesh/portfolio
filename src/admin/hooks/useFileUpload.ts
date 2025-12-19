// src/admin/hooks/useFileUpload.ts
import { useState, useCallback } from 'react';
import { storage } from '../../utils/storage';
import { compressImage, isImageFile, formatFileSize } from '../../utils/imageCompression';
import { UploadedFile, FileUploadOptions } from '../../types/admin.types';

export function useFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>(() => storage.getFiles());
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const refreshFiles = useCallback(() => {
    setFiles(storage.getFiles());
  }, []);

  const uploadFile = useCallback(async (
    file: File,
    type: UploadedFile['type'],
    options: FileUploadOptions = {},
    metadata?: UploadedFile['metadata']
  ): Promise<UploadedFile> => {
    const {
      maxSize = 5 * 1024 * 1024, // 5MB default
      allowedTypes = ['image/*', 'application/pdf'],
      compress = true,
      quality = 0.8
    } = options;

    // Validate file size
    if (file.size > maxSize) {
      throw new Error(`File size exceeds ${formatFileSize(maxSize)} limit`);
    }

    // Validate file type
    const isAllowed = allowedTypes.some(allowedType => {
      if (allowedType.endsWith('/*')) {
        const category = allowedType.split('/')[0];
        return file.type.startsWith(category + '/');
      }
      return file.type === allowedType;
    });

    if (!isAllowed) {
      throw new Error('File type not allowed');
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      let fileData: string;

      // Compress images
      if (isImageFile(file) && compress) {
        setUploadProgress(30);
        fileData = await compressImage(file, { quality });
        setUploadProgress(70);
      } else {
        // Convert to base64 for non-images
        fileData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        setUploadProgress(70);
      }

      const uploadedFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        type,
        size: file.size,
        mimeType: file.type,
        data: fileData,
        uploadDate: new Date().toISOString(),
        metadata
      };

      storage.addFile(uploadedFile);
      setUploadProgress(100);
      refreshFiles();

      return uploadedFile;
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, [refreshFiles]);

  const deleteFile = useCallback((id: string) => {
    storage.deleteFile(id);
    refreshFiles();
  }, [refreshFiles]);

  const updateFileMetadata = useCallback((id: string, metadata: UploadedFile['metadata']) => {
    storage.updateFile(id, { metadata });
    refreshFiles();
  }, [refreshFiles]);

  const getFilesByType = useCallback((type: UploadedFile['type']) => {
    return files.filter(f => f.type === type);
  }, [files]);

  const getFilesByProject = useCallback((projectId: string) => {
    return files.filter(f => f.metadata?.projectId === projectId);
  }, [files]);

  const downloadFile = useCallback((file: UploadedFile) => {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return {
    files,
    isUploading,
    uploadProgress,
    uploadFile,
    deleteFile,
    updateFileMetadata,
    getFilesByType,
    getFilesByProject,
    downloadFile,
    refreshFiles
  };
}