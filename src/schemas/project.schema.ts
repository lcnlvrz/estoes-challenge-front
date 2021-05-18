import * as Yup from "yup";

export const ProjectSchema = Yup.object().shape({
  name: Yup.string().required("Required!"),
  description: Yup.string().required("Required!"),
  projectManager: Yup.string().required("Required!"),
  assignedTo: Yup.string().required("Required!"),
  status: Yup.string().required("Required!"),
});
