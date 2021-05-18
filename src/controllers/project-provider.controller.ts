import { message } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ProjectService } from "../services/project.service";
import { IProject } from "../types/projectContext.type";

export const useProjectProvider = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const addNewProject = (input: IProject) => {
    setProjects((prevProjects) => [...prevProjects, input]);
  };

  const updateProject = (input: IProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => (project.id === input.id ? input : project))
    );
  };

  const removeProject = (id: number) => {
    const indexMatch = projects.findIndex((project) => project.id === id);
    if (indexMatch !== -1) {
      const newState = [...projects];
      newState.splice(indexMatch, 1);
      setProjects(newState);
    }
  };

  const getProjects = async (
    successMessage?: string,
    errorMessage?: string
  ) => {
    setIsLoading(true);
    try {
      const res = await ProjectService.getMany(page, 5);
      setIsLoading(false);
      setPage(res.data.meta.currentPage);
      setTotalItems(res.data.meta.totalItems);
      setProjects(res.data.items);
      if (successMessage) {
        message.success(successMessage);
      }
    } catch (err) {
      setIsLoading(false);
      if (errorMessage) {
        message.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    getProjects();
  }, [page]);

  return {
    projects,
    isLoading,
    addNewProject,
    updateProject,
    removeProject,
    getProjects,
    setPage,
    setTotalItems,
    page,
    totalItems,
  };
};
