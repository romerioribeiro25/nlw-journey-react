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
  const { tripId } = useParams<{ tripId: string }>();

  const [activities, setActivities] = useState<Activity[]>([]);
  const { create: createActivitesHook, get: getActivitesHook } =
    useActivitiesHook();

  const getActivities = useCallback(async () => {
    if (tripId) {
      const response = await getActivitesHook(tripId);
      setActivities(response);
    }
  }, [tripId, getActivitesHook]);

  const createActivities = useCallback(
    async (createActivityDto: CreateActivityDto) => {
      if (tripId) {
        await createActivitesHook(tripId, createActivityDto);
        await getActivities();
      }
    },
    [tripId, createActivitesHook, getActivities]
  );

  // async function createActivities(createActivityDto: CreateActivityDto) {
  //   await useActivities.create(tripId as string, createActivityDto);
  //   await getActivities();
  // }

  useEffect(() => {
    if (tripId) {
      getActivities();
    }
    // api.get(`trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
  }, [tripId, getActivities]);

  return (
    <ActivitiesContext.Provider
      value={{ activities, setActivities, createActivities, getActivities }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}
