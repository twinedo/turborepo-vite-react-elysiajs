import { useQuery } from "@tanstack/react-query";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  Project,
  ProjectImage,
} from "~repo-shared";

const getProjects = async (platform?: 'mobile' | 'website'): Promise<Project[]> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/project?platform=${platform}`);

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json().catch(() => ({
      status: response.status,
      message: response.statusText,
    }));
    throw new Error(errorData.message || "Failed to fetch projects");
  }

  const resData: ApiSuccessResponse<Project[]> = await response.json();
  return resData.data;
};

export const useGetProjects = (platform?: 'mobile' | 'website') => {
  return useQuery({ queryKey: ["getProjects", platform], queryFn: () => getProjects(platform) });
};

const getProjectById = async (id: string): Promise<Project> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/project/${id}`);

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json().catch(() => ({
      status: response.status,
      message: response.statusText,
    }));
    throw new Error(errorData.message || "Failed to fetch projects");
  }

  const resData: ApiSuccessResponse<Project> = await response.json();
  return resData.data;
}; 

export const useGetProjectById = (id: string) => {
  return useQuery({ queryKey: ["getProjects", id], queryFn: () => getProjectById(id) });
};

const getProjectImages = async (bucket: string): Promise<ProjectImage[]> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/project-images/${bucket}`);

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json().catch(() => ({
      status: response.status,
      message: response.statusText,
    }));
    throw new Error(errorData.message || "Failed to fetch projects");
  }

  const resData: ApiSuccessResponse<ProjectImage[]> = await response.json();
  return resData.data;
}; 

export const useGetProjectImages = (bucket: string) => {
  return useQuery({ queryKey: ["getProjectImages", bucket], queryFn: () => getProjectImages(bucket) });
};