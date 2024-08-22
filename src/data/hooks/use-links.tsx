import { api } from "@/lib/axios";
import { useCallback } from "react";

interface Link {
  id: string;
  title: string;
  url: string;
}

export type CreateLinkDto = Omit<Link, "id">;

export function useLinksHook() {
  // async function get(tripId: string): Promise<Link[]> {
  //   const response = await api.get(`/trips/${tripId}/links`);
  //   return response.data.links;
  // }

  const get = useCallback(async (tripId: string) => {
    const response = await api.get(`/trips/${tripId}/links`);
    return response.data.links;
  }, []);

  const create = useCallback(
    async (tripId: string, createLinkDto: CreateLinkDto) => {
      await api.post(`/trips/${tripId}/links`, createLinkDto);
    },
    []
  );

  // async function create(tripId: string, createLinkDto: CreateLinkDto) {
  //   await api.post(`/trips/${tripId}/links`, createLinkDto);
  // }

  return { get, create };
}
