const encoder = new TextEncoder();

export const ADMIN_SESSION_COOKIE_NAME = "admin_session";
export const ADMIN_SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

type AdminSessionPayload = {
  role: "admin";
  exp: number;
};

function toBase64Url(value: string) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "utf8").toString("base64url");
  }

  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "base64url").toString("utf8");
  }

  return atob(value.replace(/-/g, "+").replace(/_/g, "/"));
}

function bytesToBase64Url(value: ArrayBuffer) {
  const bytes = new Uint8Array(value);

  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64url");
  }

  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string) {
  if (typeof Buffer !== "undefined") {
    return Uint8Array.from(Buffer.from(value, "base64url"));
  }

  const binary = atob(value.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function importSessionKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

export function getAdminSessionCookieOptions() {
  return {
    name: ADMIN_SESSION_COOKIE_NAME,
    httpOnly: true,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: ADMIN_SESSION_DURATION_SECONDS,
  };
}

export function getAdminSessionClearingOptions() {
  return {
    ...getAdminSessionCookieOptions(),
    maxAge: 0,
  };
}

// The signed cookie only stores role + expiry metadata. The raw password and hash
// never leave the server and are never placed in client-visible storage.
export async function createAdminSessionToken() {
  const secret = getSessionSecret();

  if (!secret) {
    return null;
  }

  const payload = toBase64Url(
    JSON.stringify({
      role: "admin",
      exp: Date.now() + ADMIN_SESSION_DURATION_SECONDS * 1000,
    } satisfies AdminSessionPayload),
  );
  const key = await importSessionKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));

  return `${payload}.${bytesToBase64Url(signature)}`;
}

export async function verifyAdminSessionToken(token?: string | null) {
  if (!token) {
    return false;
  }

  const secret = getSessionSecret();

  if (!secret) {
    return false;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return false;
  }

  try {
    const key = await importSessionKey(secret);
    const signatureBytes = base64UrlToBytes(signature);
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      encoder.encode(payload),
    );

    if (!isValid) {
      return false;
    }

    const parsed = JSON.parse(fromBase64Url(payload)) as Partial<AdminSessionPayload>;

    return parsed.role === "admin" && typeof parsed.exp === "number" && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

export function sanitizeAdminRedirect(value?: string | null) {
  if (!value || !value.startsWith("/")) {
    return "/admin/write";
  }

  if (value.startsWith("//") || !value.startsWith("/admin")) {
    return "/admin/write";
  }

  return value;
}
