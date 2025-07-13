import { useQuery } from "@tanstack/react-query";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  Experience,
} from "~repo-shared";

const getExperiences = async (): Promise<Experience[]> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/experience`);
  
  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json().catch(() => ({
      status: response.status,
      message: response.statusText
    }));
    throw new Error(errorData.message || 'Failed to fetch experiences');
  }

  const resData: ApiSuccessResponse<Experience[]> = await response.json();
  return resData.data;
};

export const useGetExperiences = () => {
  return useQuery({ queryKey: ["getExperiences"], queryFn: getExperiences });
};
