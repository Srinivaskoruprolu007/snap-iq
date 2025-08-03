"use client";

import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Plus,
  Image as ImageIcon,
  Wand2,
  Crop,
  Eraser,
  SparkleIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";

const DashboardPage = () => {
  const router = useRouter();
  const { data: projects, isLoading } = useConvexQuery(
    api.projects.getUserProjects
  );
  const { data: user } = useUser();
  const currentProjectCount = projects?.length || 0;
  const isFree = user?.plan === "free";


  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateProject = () => {
    router.push("/projects/new");
    setShowCreateModal(false);
  };

  return (
    <div className="h-full p-28">
      {/* Header with Create Project button */}
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          My Editing Projects
        </motion.h1>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowCreateModal(true)}
            className="gap-2"
          >
            <Plus size={18} />
            New Project
          </Button>
        </motion.div>
      </div>

      {/* Create Project Modal */}
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
          <div className="space-y-4 py-4">
            <Button
              variant="primary"
              className="w-full"
              onClick={handleCreateProject}
            >
              <SparkleIcon className="mr-2" />
              Start New Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : projects?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="text-center max-w-md">
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              No projects yet
            </h3>
            <p className="text-gray-400 mb-6">
              Create your first image editing project to get started
            </p>
            <Button
              variant="primary"
              onClick={() => setShowCreateModal(true)}
              className={"cursor-pointer"}
            >
              <SparkleIcon className="mr-2" /> Start Editing
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              delay={index * 0.1}
              onClick={() => router.push(`/projects/${project._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ project, delay, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03 }}
      className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all cursor-pointer"
      onClick={onClick}
    >
      {/* Project Thumbnail */}
      <div className="relative aspect-square bg-gray-800">
        {project.thumbnailUrl ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <ImageIcon size={48} />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-white truncate">
            {project.title}
          </h3>
          <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
            {project.width}x{project.height}
          </span>
        </div>

        {/* Active Transformations */}
        {project.activeTransformations && (
          <div className="flex flex-wrap gap-2 mb-3">
            {project.activeTransformations.includes("crop") && (
              <span className="flex items-center text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                <Crop size={12} className="mr-1" /> Crop
              </span>
            )}
            {project.backgroundRemoved && (
              <span className="flex items-center text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                <Eraser size={12} className="mr-1" /> BG Removed
              </span>
            )}
            {project.activeTransformations.includes("ai") && (
              <span className="flex items-center text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                <Wand2 size={12} className="mr-1" /> AI Enhanced
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{new Date(project._creationTime).toLocaleDateString()}</span>
          <span>
            Last edited: {new Date(project.lastActiveAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCardSkeleton = () => {
  return (
    <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-white/10"></div>
      <div className="p-4">
        <div className="h-6 w-3/4 bg-white/10 rounded mb-4"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-4 w-16 bg-white/10 rounded-full"></div>
          <div className="h-4 w-16 bg-white/10 rounded-full"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 w-1/3 bg-white/10 rounded"></div>
          <div className="h-3 w-1/3 bg-white/10 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
