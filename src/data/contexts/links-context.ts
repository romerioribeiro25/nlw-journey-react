import React, { useContext, createContext } from "react";
import { CreateLinkDto } from "../hooks/useLinks";

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

export const LinksContext = createContext<LinksContextType | undefined>(
  undefined
);

export function useLinksContext(): LinksContextType {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks deve ser usado dentro de um LinksProvider");
  }
  return context;
}
