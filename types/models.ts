export type User = {
  id: string;
  name?: string;
  email: string;
  createdAt?: string;
};

export type GroupMember = {
  id: string;
  name?: string;
  email?: string;
};

export type Expense = {
  id: string;
  groupId: string;
  amount: number | string;
  currency?: string;
  description: string;
  paidBy: GroupMember | User;
  createdAt?: string;
};

export type Group = {
  id: string;
  name: string;
  createdById?: string;
  members?: GroupMember[];
  expenses?: Expense[];
  createdAt?: string;
};

export type Balance = {
  id?: string;
  groupId: string;
  groupName?: string;
  fromUser: GroupMember | User;
  toUser: GroupMember | User;
  amount: number | string;
};

export type Settlement = {
  id: string;
  groupId: string;
  fromUserId: string;
  toUserId: string;
  amount: number | string;
  createdAt?: string;
};
