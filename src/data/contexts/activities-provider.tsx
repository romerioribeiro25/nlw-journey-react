import { ReactNode, useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreateActivityDto, useActivitiesHook } from "../hooks/useActivities";
import { ActivitiesContext } from "./activities-context";

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

interface ActivitiesProviderProps {
  children: ReactNode;
}

export function ActivitiesProvider({ children }: ActivitiesProviderProps) {
  const { tripId } = useParams();

  const [activities, setActivities] = useState<Activity[]>([]);
  const useActivities = useActivitiesHook();

  const getActivities = useCallback(async () => {
    const response = await useActivities.get(tripId as string);
    setActivities(response);
  }, [tripId, useActivities]);

  const createActivities = useCallback(
    async (createActivityDto: CreateActivityDto) => {
      await useActivities.create(tripId as string, createActivityDto);
      await getActivities();
    },
    [tripId, getActivities, useActivities]
  );

  // async function createActivities(createActivityDto: CreateActivityDto) {
  //   await useActivities.create(tripId as string, createActivityDto);
  //   await getActivities();
  // }

  useEffect(() => {
    getActivities();
    // api.get(`trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
  }, []);

  return (
    <ActivitiesContext.Provider
      value={{ activities, setActivities, createActivities, getActivities }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}
