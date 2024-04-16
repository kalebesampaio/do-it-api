import { compare } from "bcryptjs";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

import userRepository from "../repositories/user.repository";
import { sign } from "jsonwebtoken";
import { SessionCreate, SessionReturn } from "../interfaces/session.interfaces";

export class sessionServices {
  create = async ({
    email,
    password,
  }: SessionCreate): Promise<SessionReturn> => {
    const foundUser: User | null = await userRepository.findOneBy({ email });

    if (!foundUser) {
      throw new AppError(401, "Invalid credentials");
    }

    const samePwd: boolean = await compare(password, foundUser.password);

    if (!samePwd) {
      throw new AppError(401, "Invalid credentials");
    }

    const token: string = sign(
      { admin: false },
      process.env.SECRET_KEY!,
      { subject: foundUser.id.toString(), expiresIn: process.env.EXPIRES_IN! }
    );

    return { token };
  };
}