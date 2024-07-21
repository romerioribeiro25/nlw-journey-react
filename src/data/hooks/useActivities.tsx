import { useCallback } from "react";
import { api } from "../../lib/axios";

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

interface CreateActivityDto {
  title: string;
  occurs_at: string;
}

export function useActivities() {
  const get = useCallback(async (tripId: string): Promise<Activity[]> => {
    const response = await api.get(`trips/${tripId}/activities`);
    return response.data.activities;
  }, []);

  const create = useCallback(
    async (tripId: string, createActivityDto: CreateActivityDto) => {
      await api.post(`/trips/${tripId}/activities`, {
        ...createActivityDto,
      });
    },
    []
  );

  return { get, create };
}
