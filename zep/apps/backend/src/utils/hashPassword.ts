import bcrypt, { genSalt } from "bcrypt";
import { Response } from "express";
export const HashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  userPassword: string
) => {
  const res = bcrypt.compare(password, process.env.PASSWORDSECRET || "", () => {
    if (password != userPassword) {
      return false;
    }

    return true;
  });
};
