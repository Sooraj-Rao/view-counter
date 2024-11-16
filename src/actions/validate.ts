"use server";
export const validate = (user: string) => {
  return process.env.OWNER === user;
};
