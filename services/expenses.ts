import { api } from "./api";
import { Expense } from "@/types/models";

export type CreateExpenseInput = {
  groupId: string;
  amount: number;
  description: string;
  paidById: string;
  currency: string;
  splits: { userId: string; amount: number }[];
};

export const listExpenses = async (groupId: string) => {
  const { data } = await api.get<{ expenses: Expense[] }>(`/expenses`, {
    params: { groupId },
  });
  return data.expenses;
};

export const createExpense = async (payload: CreateExpenseInput) => {
  const { data } = await api.post<{ expense: Expense }>("/expenses", payload);
  return data.expense;
};
