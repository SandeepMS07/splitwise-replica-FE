import { api } from "./api";
import { Balance } from "@/types/models";

export const listBalances = async (groupId?: string) => {
  const { data } = await api.get<{ balances: Balance[] }>("/balances", {
    params: groupId ? { groupId } : undefined,
  });
  return data.balances;
};
