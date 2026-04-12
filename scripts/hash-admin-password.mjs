import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run hash:admin-password -- \"your-password\"");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
const escapedHash = hash.replace(/\$/g, "\\$");

console.log("");
console.log("ADMIN_PASSWORD_HASH=");
console.log(escapedHash);
