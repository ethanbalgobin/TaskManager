import { useQuery } from "@tanstack/react-query";
import { TasksApi } from "../api/tasksApi";

export function useTasks(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["tasks", page, pageSize],
    queryFn: () => TasksApi.getPaged(page, pageSize),
  });
}
