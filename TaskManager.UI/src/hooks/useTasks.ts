import { useQuery } from "@tanstack/react-query";
import { TasksApi } from "../api/tasksApi";

export function useTasks(
  page: number,
  pageSize: number,
  sortDirection: "asc" | "desc",
  sortBy: string
) {
  return useQuery({
    queryKey: ["tasks", page, pageSize, sortDirection, sortBy],
    queryFn: () => TasksApi.getPaged(page, pageSize, sortDirection, sortBy),
  });
}
