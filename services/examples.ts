import { getApiErrorCode, getApiErrorMessage } from "@/services/api";
import { login, register } from "@/services/auth";
import { listGroups } from "@/services/groups";
import { createExpense } from "@/services/expenses";

export const exampleLogin = async (email: string, password: string) => {
  try {
    const data = await login(email, password);
    return data;
  } catch (error) {
    return {
      errorCode: getApiErrorCode(error),
      errorMessage: getApiErrorMessage(error),
    };
  }
};

export const exampleRegister = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const data = await register(name, email, password);
    return data;
  } catch (error) {
    return {
      errorCode: getApiErrorCode(error),
      errorMessage: getApiErrorMessage(error),
    };
  }
};

export const exampleListGroups = async () => {
  try {
    return await listGroups();
  } catch (error) {
    return {
      errorCode: getApiErrorCode(error),
      errorMessage: getApiErrorMessage(error),
    };
  }
};

export const exampleCreateExpense = async (payload: {
  groupId: string;
  description: string;
  amount: number;
  currency: string;
  paidById: string;
  splits: { userId: string; amount: number }[];
}) => {
  try {
    return await createExpense(payload);
  } catch (error) {
    return {
      errorCode: getApiErrorCode(error),
      errorMessage: getApiErrorMessage(error),
    };
  }
};
