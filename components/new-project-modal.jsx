"use client";
import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { usePlanAccess } from "@/hooks/use-plan-access";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SparkleIcon, Upload, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export const NewProjectModal = ({ showCreateModal, setShowCreateModal }) => {
  const { data: projects, isLoading } = useConvexQuery(
    api.projects.getUserProjects
  );
  const createProject = useConvexMutation(api.projects.create);
  const { canCreateProject, isFree } = usePlanAccess();
  const router = useRouter();
  const currentProjectCount = projects?.length || 0;
  const canCreate = canCreateProject(currentProjectCount);

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!canCreate) return;

    const file = acceptedFiles[0];
    if (!file) return;

    // Check file size (20MB limit)
    if (file.size > 20 * 1024 * 1024) {
      setError("File size must be less than 20MB");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Resize and convert image to base64 for storage
      const imageData = await new Promise((resolve, reject) => {
        // Create preview first
        const previewReader = new FileReader();
        previewReader.onloadend = () => {
          setPreview(previewReader.result);
        };
        previewReader.readAsDataURL(file);
        
        // Create a smaller version for storage
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        img.onload = () => {
          // Calculate new dimensions (max 1200px width/height)
          const MAX_SIZE = 1200;
          let width = img.width;
          let height = img.height;
          
          if (width > height && width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
          
          // Resize image
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to base64 with reduced quality
          const resizedImageData = canvas.toDataURL('image/jpeg', 0.7);
          resolve(resizedImageData);
        };
        
        img.onerror = reject;
        
        // Create a temporary URL for the image
        const reader = new FileReader();
        reader.onloadend = () => img.src = reader.result;
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      
      // Create project with image data
      const projectId = await createProject({
        title: file.name.split('.')[0], // Use filename as title
        originalImageUrl: imageData,
        thumbnailUrl: imageData,
        width: 800,
        height: 600,
        canvasState: {}
      });
      setShowCreateModal(false);
      router.push(`/projects/${projectId}`);
    } catch (err) {
      setError("Failed to create project. Please try again.");
    } finally {
      setUploading(false);
    }
  }, [canCreate, createProject, router, setShowCreateModal]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024, // 20MB
    disabled: !canCreate || uploading
  });

  return (
    <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create New Project
            {isFree && (
              <Badge variant="secondary" className="ml-2">
                {currentProjectCount} / 3 Projects
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Start a new image editing project. Choose your options below.
          </DialogDescription>
        </DialogHeader>
        {isFree && currentProjectCount >= 3 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Project Limit Reached</AlertTitle>
            <AlertDescription>
              You've reached the maximum number of projects (3) for the free plan. 
              Please upgrade to our Pro or Premium plans to create more projects and unlock additional features.
            </AlertDescription>
          </Alert>
        )}
        {isFree && currentProjectCount < 3 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Free Plan</AlertTitle>
            <AlertDescription>
              You can create {3 - currentProjectCount} more project{3 - currentProjectCount !== 1 ? 's' : ''} on the free plan.
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-4 py-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
              ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}
              ${!canCreate || uploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2">
              {isDragActive
                ? "Drop the image here"
                : "Drag & drop an image here, or click to select"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: JPEG, JPG, PNG, GIF (max 20MB)
            </p>
            {preview && (
              <div className="mt-4 mx-auto max-w-[160px] max-h-[160px] relative aspect-square">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="rounded-lg object-contain"
                  sizes="160px"
                />
              </div>
            )}
            {error && (
              <p className="text-red-500 mt-2">{error}</p>
            )}
          </div>
          
          <Button
            variant="primary"
            className="w-full"
            disabled={!canCreate || uploading}
            onClick={() => {
              setShowCreateModal(false);
              router.push("/projects/new");
            }}
          >
            <SparkleIcon className="mr-2" />
            {uploading ? "Creating Project..." : "Start New Project"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
