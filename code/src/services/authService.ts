import { prisma } from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/password";
import { signToken } from "../utils/jwt";
import { HttpError } from "../middleware/errorHandler";

type RegisterOwnerInput = {
  salonName: string;
  salonPhone?: string;
  salonCity?: string;
  ownerName: string;
  email: string;
  password: string;
  phone?: string;
};

export const registerOwner = async (input: RegisterOwnerInput) => {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw new HttpError(400, "Email already registered");
  }

  const passwordHash = await hashPassword(input.password);

  const result = await prisma.$transaction(async (tx) => {
    const salon = await tx.salon.create({
      data: {
        name: input.salonName,
        phone: input.salonPhone ?? null,
        city: input.salonCity ?? null,
      },
    });

    const user = await tx.user.create({
      data: {
        salonId: salon.id,
        name: input.ownerName,
        email: input.email,
        phone: input.phone ?? null,
        password: passwordHash,
        role: "OWNER",
      },
    });

    return { salon, user };
  });

  const token = signToken({
    userId: result.user.id,
    salonId: result.salon.id,
    role: result.user.role,
  });

  return {
    token,
    user: {
      id: result.user.id,
      salonId: result.salon.id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
    },
    salon: result.salon,
  };
};

type LoginInput = {
  email: string;
  password: string;
};

export const login = async (input: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    include: { salon: true },
  });

  if (!user) {
    throw new HttpError(401, "Invalid credentials");
  }

  const valid = await comparePassword(input.password, user.password);
  if (!valid) {
    throw new HttpError(401, "Invalid credentials");
  }

  const token = signToken({ userId: user.id, salonId: user.salonId, role: user.role });

  return {
    token,
    user: {
      id: user.id,
      salonId: user.salonId,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    salon: user.salon,
  };
};

