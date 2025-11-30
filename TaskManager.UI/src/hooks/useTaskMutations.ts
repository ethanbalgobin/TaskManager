import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TasksApi } from "../api/tasksApi";

export function useTaskMutations() {
  const queryClient = useQueryClient();

  // Delete task
  const deleteTask = useMutation({
    mutationFn: (id: number) => TasksApi.delete(id),

    onMutate: async (id: number) => {
      // Pause all tasks queries
      await queryClient.cancelQueries({ queryKey: ["tasks"] }); // Snapshot all affected queries

      const previousQueries = queryClient.getQueriesData({
        queryKey: ["tasks"],
      });

      previousQueries.forEach(([key, old]: any) => {
        if (!old) return;

        queryClient.setQueryData(key, {
          ...old,
          items: old.items.filter((t: any) => t.id !== id),
        });
      });

      return { previousQueries };
    },

    onError: (_err, _id, context) => {
      // Rollback if mutation fails
      if (context?.previousQueries) {
        context.previousQueries.forEach(([key, data]: any) => {
          queryClient.setQueryData(key, data);
        });
      }
    },

    onSettled: () => {
      // Refetch all tasks queries
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Mark Complete
  const completeTask = useMutation({
    mutationFn: (id: number) => TasksApi.markComplete(id),

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousQueries = queryClient.getQueriesData({
        queryKey: ["tasks"],
      });

      previousQueries.forEach(([key, old]: any) => {
        if (!old) return;

        queryClient.setQueryData(key, {
          ...old,
          items: old.items.map((t: any) =>
            t.id === id ? { ...t, isComplete: true } : t
          ),
        });
      });

      return { previousQueries };
    },

    onError: (_err, _id, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([key, data]: any) => {
          queryClient.setQueryData(key, data);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTask = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: any }) =>
      TasksApi.update(id, dto),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });

  return { deleteTask, completeTask, updateTask };
}
