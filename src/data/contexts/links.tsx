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
  createLinkModal: boolean;
  handleToggleCreateLinkModal: () => void;
}

const LinksContext = createContext<LinksContextType | undefined>(undefined);

interface LinksProviderProps {
  children: ReactNode;
}

export function LinksProvider({ children }: LinksProviderProps) {
  const { tripId } = useParams<{ tripId: string }>();

  const { create: createLinksHook, get: getLinksHook } = useLinksHook();
  const [links, setLinks] = useState<Link[]>([]);
  const [createLinkModal, setCreateLinkModal] = useState(false);

  function handleToggleCreateLinkModal() {
    setCreateLinkModal((prev) => !prev);
  }

  const getLinks = useCallback(async () => {
    if (tripId) {
      const response = await getLinksHook(tripId);
      setLinks(response);
    }
  }, [tripId, getLinksHook]);

  const createLinks = useCallback(
    async (createLinkDto: CreateLinkDto) => {
      if (tripId) {
        await createLinksHook(tripId, createLinkDto);
        await getLinks();
      }
    },
    [tripId, createLinksHook, getLinks]
  );

  useEffect(() => {
    if (tripId) {
      getLinks();
      // api.get(`trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
    }
  }, [getLinks, tripId]);

  return (
    <LinksContext.Provider
      value={{
        links,
        setLinks,
        createLinks,
        getLinks,
        createLinkModal,
        handleToggleCreateLinkModal,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
}

export function useLinksContext(): LinksContextType {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks deve ser usado dentro de um LinksProvider");
  }
  return context;
}
