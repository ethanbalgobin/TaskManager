import axiosClient from "./axiosClient";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  isComplete: boolean;
  dueDate: string | null;
  createdOn: string;
  updatedOn: string | null;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export const TasksApi = {
  getPaged: async (page: number, pageSize: number) => {
    const response = await axiosClient.get<PagedResult<Task>>(
      `tasks/paged?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  },
};
