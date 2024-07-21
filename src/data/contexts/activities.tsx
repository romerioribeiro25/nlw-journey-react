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
  getActivities: () => Promise<void>;
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

  const getActivities = useCallback(async () => {
    console.log("getActivities");
    const response = await useActivities.get(tripId as string);
    setActivities(response);
  }, []);

  async function createActivities(createActivityDto: CreateActivityDto) {
    await useActivities.create(tripId as string, createActivityDto);
    await getActivities();
  }

  useEffect(() => {
    getActivities();
    // api.get(`trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
  }, [getActivities]);

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
