import { message } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { ProjectContext } from "../contexts/ProjectContext";
import { useCancelToken } from "../hooks/useCancelToken";
import { ProjectService } from "../services/project.service";
import { ICreateProject } from "../types/projectContext.type";

export const useEditProject = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getProjectId = (): number => {
    const id = new URL(window.location.href).searchParams.get("projectId");
    return parseInt(id || "");
  };

  const cancelTokenController = useCancelToken();

  const projectConsumer = useContext(ProjectContext);

  const currentProject = projectConsumer.projects.find(
    (project) => project.id === getProjectId()
  );

  const editProject = (input: ICreateProject) => {
    const { token } = cancelTokenController.getAndSetOne();
    const id = getProjectId();
    setIsLoading(true);
    ProjectService.updateOne(input, id, token)
      .then(async (res) => {
        setIsLoading(false);
        if (projectConsumer.getProjects) {
          await projectConsumer.getProjects(
            "Project updated successfully!",
            "Unexpected error happened!"
          );
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setIsLoading(false);
        message.error(
          err.response?.data?.detail || "Unexpected error happened!"
        );
      });
  };

  return { isLoading, editProject, currentProject };
};
