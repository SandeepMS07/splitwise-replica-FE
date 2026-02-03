import { api } from "./api";
import { Group } from "@/types/models";

export const listGroups = async () => {
  const { data } = await api.get<{ groups: Group[] }>("/groups");
  return data.groups;
};

export const createGroup = async (name: string, memberEmails?: string[]) => {
  const { data } = await api.post<{ group: Group }>("/groups", {
    name,
    memberEmails,
  });
  return data.group;
};

export const getGroup = async (id: string) => {
  const { data } = await api.get<{ group: Group }>(`/groups/${id}`);
  return data.group;
};
