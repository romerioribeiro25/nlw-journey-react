import React, {
  ReactNode,
  useContext,
  useState,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { useParams } from "react-router-dom";
import { CreateActivityDto, useActivitiesHook } from "../hooks/useActivities";

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

interface ActivitiesContextType {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  getActivities: (tripId: string) => Promise<void>;
  createActivities: (createActivityDto: CreateActivityDto) => Promise<void>;
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(
  undefined
);

interface ActivitiesProviderProps {
  children: ReactNode;
}

export function ActivitiesProvider({ children }: ActivitiesProviderProps) {
  const { tripId } = useParams();

  const [activities, setActivities] = useState<Activity[]>([]);
  const useActivities = useActivitiesHook();

  const getActivities = useCallback(async (tripId: string) => {
    const response = await useActivities.get(tripId);
    setActivities(response);
  }, []);

  async function createActivities(createActivityDto: CreateActivityDto) {
    await useActivities.create(tripId as string, createActivityDto);
    await getActivities(tripId as string);
  }

  useEffect(() => {
    getActivities(tripId as string);
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

export function useActivities(): ActivitiesContextType {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error(
      "useActivities deve ser usado dentro de um ActivitiesProvider"
    );
  }
  return context;
}
