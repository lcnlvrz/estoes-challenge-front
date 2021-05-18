import { message } from "antd";
import axios, { AxiosError } from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { ProjectContext } from "../contexts/ProjectContext";
import { useCancelToken } from "../hooks/useCancelToken";
import { ProjectService } from "../services/project.service";

export const useListCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const cancelTokenController = useCancelToken();

  const projectConsumer = useContext(ProjectContext);

  const history = useHistory();

  const handleVisibleModal = () => {
    if (visibleConfirm) {
      setVisibleConfirm(false);
    } else {
      setVisibleConfirm(true);
    }
  };

  const deleteOne = async (id: number) => {
    const { token } = cancelTokenController.getAndSetOne();
    setIsLoading(true);
    ProjectService.removeOne(id, token)
      .then(async (_) => {
        setIsLoading(false);
        if (projectConsumer.getProjects) {
          await projectConsumer.getProjects();
          history.push("/");
          message.success("Project removed successfully!");
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

  return { isLoading, deleteOne, visibleConfirm, handleVisibleModal };
};
