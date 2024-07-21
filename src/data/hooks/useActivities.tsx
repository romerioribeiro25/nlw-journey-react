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

export interface CreateActivityDto {
  title: string | undefined;
  occurs_at: string | undefined;
}

export function useActivitiesHook() {
  const get = useCallback(async (tripId: string): Promise<Activity[]> => {
    const response = await api.get(`trips/${tripId}/activities`);
    return response.data.activities;
  }, []);

  const create = useCallback(
    async (tripId: string, createActivityDto: CreateActivityDto) => {
      await api.post(`/trips/${tripId}/activities`, createActivityDto);
    },
    []
  );

  return { get, create };
}
