import { message } from "antd";
import axios, { AxiosError } from "axios";
import { FormikHelpers } from "formik";
import { useContext, useState } from "react";
import { ProjectContext } from "../contexts/ProjectContext";
import { useCancelToken } from "../hooks/useCancelToken";
import { ProjectService } from "../services/project.service";
import { ICreateProject } from "../types/projectContext.type";

export const useAddProject = () => {
  const [isLoading, setIsLoading] = useState(false);

  const cancelTokenController = useCancelToken();

  const projectConsumer = useContext(ProjectContext);

  const addProject = (input: ICreateProject) => {
    const { token } = cancelTokenController.getAndSetOne();
    setIsLoading(true);
    ProjectService.createOne(input, token)
      .then(async (_) => {
        setIsLoading(false);
        if (projectConsumer.getProjects) {
          await projectConsumer.getProjects(
            "Project created successfully!",
            "Unexpected error happened!"
          );
        }
      })
      .catch((err: AxiosError) => {
        if (axios.isCancel(err)) return;
        setIsLoading(false);
        message.error(
          err.response?.data?.detail || "Unexpected error happened!"
        );
      });
  };

  return { addProject, isLoading };
};
