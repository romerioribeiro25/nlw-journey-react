import React, { useContext, createContext } from "react";
import { CreateActivityDto } from "../hooks/use-activities";

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

export const ActivitiesContext = createContext<
  ActivitiesContextType | undefined
>(undefined);

export function useActivities(): ActivitiesContextType {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error(
      "useActivities deve ser usado dentro de um ActivitiesProvider"
    );
  }
  return context;
}
