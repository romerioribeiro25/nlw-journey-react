import { api } from "@/lib/axios";

interface Link {
  id: string;
  title: string;
  url: string;
}

export type CreateLinkDto = Omit<Link, "id">;

export function useLinksHook() {
  async function get(tripId: string): Promise<Link[]> {
    const response = await api.get(`/trips/${tripId}/links`);
    return response.data.links;
  }

  async function create(tripId: string, createLinkDto: CreateLinkDto) {
    await api.post(`/trips/${tripId}/links`, createLinkDto);
  }

  return { get, create };
}
