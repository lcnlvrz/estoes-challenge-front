import { Spin } from "antd";
import { createContext } from "react";
import { useProjectProvider } from "../controllers/project-provider.controller";
import {
  IProjectProviderProps,
  IProjectProviderState,
} from "../types/projectContext.type";

export const ProjectContext = createContext<IProjectProviderState>({
  projects: [],
  isLoading: false,
  page: 1,
  total: 0,
});

export const ProjectProvider = (props: IProjectProviderProps) => {
  const controller = useProjectProvider();

  return (
    <ProjectContext.Provider
      value={{
        projects: controller.projects,
        isLoading: controller.isLoading,
        updateProject: controller.updateProject,
        addProject: controller.addNewProject,
        removeProject: controller.removeProject,
        page: controller.page,
        total: controller.totalItems,
        getProjects: controller.getProjects,
        setTotalItems: controller.setTotalItems,
        setPage: controller.setPage,
      }}
    >
      {controller.isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        props.children
      )}
    </ProjectContext.Provider>
  );
};
