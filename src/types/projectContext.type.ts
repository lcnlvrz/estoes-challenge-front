export interface IProjectProviderProps {
  children: any;
}

export interface IPaginationMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IProjectPagination {
  items: IProject[];
  meta: IPaginationMeta;
}

export interface IProject {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  projectManager: string;
  assignedTo: string;
  status: string;
}

export type ICreateProject = Omit<IProject, "id" | "createdAt" | "updatedAt">;

export interface IProjectProviderState {
  projects: IProject[];
  isLoading: boolean;
  total: number;
  page: number;
  addProject?: (input: IProject) => void;
  updateProject?: (input: IProject) => void;
  removeProject?: (id: number) => void;
  getProjects?: (successMessage?: string, errorMessage?: string) => void;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  setTotalItems?: React.Dispatch<React.SetStateAction<number>>;
}
