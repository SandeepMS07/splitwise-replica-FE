import { api } from "./api";
import { Settlement } from "@/types/models";

export type CreateSettlementInput = {
  groupId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
};

export const createSettlement = async (payload: CreateSettlementInput) => {
  const { data } = await api.post<{ settlement: Settlement }>(
    "/settlements",
    payload
  );
  return data.settlement;
};
