import { api } from "@/lib/axios";

interface Link {
  id: string;
  title: string;
  url: string;
}

export interface CreateLinkDto {
  title: string | undefined;
  url: string | undefined;
}

export function useLinksHook() {
  async function get(tripId: string): Promise<Link[]> {
    const response = await api.get(`trips/${tripId}/links`);
    return response.data.activities;
  }

  async function create(tripId: string, createLinkDto: CreateLinkDto) {
    await api.post(`/trips/${tripId}/links`, createLinkDto);
  }

  return { get, create };
}
