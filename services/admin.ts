import { api } from "./api";
import { Expense, Group, User } from "@/types/models";

export const listAdminUsers = async () => {
  const { data } = await api.get<{ users: User[] }>("/admin/users");
  return data.users;
};

export const listAdminGroups = async () => {
  const { data } = await api.get<{ groups: Group[] }>("/admin/groups");
  return data.groups;
};

export const listAdminExpenses = async () => {
  const { data } = await api.get<{ expenses: Expense[] }>("/admin/expenses");
  return data.expenses;
};
