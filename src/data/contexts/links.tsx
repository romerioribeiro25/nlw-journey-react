import React, {
  ReactNode,
  useContext,
  useState,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { useParams } from "react-router-dom";
import { CreateLinkDto, useLinksHook } from "../hooks/useLinks";

interface Link {
  id: string;
  title: string;
  url: string;
}

interface LinksContextType {
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  getLinks: () => Promise<void>;
  createLinks: (createLinkDto: CreateLinkDto) => Promise<void>;
}

const LinksContext = createContext<LinksContextType | undefined>(undefined);

interface LinksProviderProps {
  children: ReactNode;
}

export function LinksProvider({ children }: LinksProviderProps) {
  const { tripId } = useParams();

  const [links, setLinks] = useState<Link[]>([]);
  const useLinks = useLinksHook();

  const getLinks = useCallback(async () => {
    const response = await useLinks.get(tripId as string);
    setLinks(response);
  }, [tripId, useLinks]);

  const createLinks = useCallback(
    async (createLinkDto: CreateLinkDto) => {
      await useLinks.create(tripId as string, createLinkDto);
      await getLinks();
    },
    [tripId, getLinks, useLinks]
  );

  useEffect(() => {
    getLinks();
    // api.get(`trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
  }, []);

  return (
    <LinksContext.Provider value={{ links, setLinks, createLinks, getLinks }}>
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks(): LinksContextType {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks deve ser usado dentro de um LinksProvider");
  }
  return context;
}
