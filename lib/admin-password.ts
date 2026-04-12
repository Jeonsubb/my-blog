import "server-only";

import bcrypt from "bcryptjs";

export const isAdminAuthConfigured = Boolean(
  process.env.ADMIN_PASSWORD_HASH && process.env.ADMIN_SESSION_SECRET,
);

export async function verifyAdminPassword(password: string) {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!passwordHash || !password) {
    return false;
  }

  return bcrypt.compare(password, passwordHash);
}
