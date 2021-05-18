import { useContext, useState } from "react";
import { ProjectContext } from "../contexts/ProjectContext";

export const useList = () => {
  const projectConsumer = useContext(ProjectContext);
  return { projectConsumer };
};
