import axios, { AxiosResponse, CancelToken } from "axios";
import {
  ICreateProject,
  IProject,
  IProjectPagination,
} from "../types/projectContext.type";

const API_BASE = `${
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000"
}`;

export class ProjectService {
  static async createOne(
    input: ICreateProject,
    cancelToken: CancelToken
  ): Promise<AxiosResponse<IProject>> {
    return await axios.post(`${API_BASE}/project`, input, { cancelToken });
  }

  static async getMany(
    page: number,
    limit: number
  ): Promise<AxiosResponse<IProjectPagination>> {
    return await axios.get(`${API_BASE}/project?page=${page}&limit=${limit}`);
  }

  static async updateOne(
    input: ICreateProject,
    projectId: number,
    cancelToken: CancelToken
  ): Promise<AxiosResponse<IProject>> {
    return await axios.put(`${API_BASE}/project/${projectId}`, input, {
      cancelToken,
    });
  }

  static async removeOne(
    id: number,
    cancelToken: CancelToken
  ): Promise<AxiosResponse<IProject>> {
    return await axios.delete(`${API_BASE}/project/${id}`, { cancelToken });
  }
}
