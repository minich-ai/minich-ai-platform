#!/usr/bin/env node
import { createHash, randomBytes } from "node:crypto";

const ids =
  process.argv.length > 2
    ? process.argv.slice(2)
    : ["fakeclient1", "fakeclient2"];

function hashApiKey(apiKey) {
  return createHash("sha256").update(apiKey).digest("hex");
}

const hashes = {};
const plaintext = {};

for (const id of ids) {
  const key = `mscp_${id}_${randomBytes(24).toString("base64url")}`;
  plaintext[id] = key;
  hashes[id] = hashApiKey(key);
}

const adminKey = `mscp_admin_${randomBytes(24).toString("base64url")}`;

console.log("Keep plaintext keys private. Only hashes belong on the platform.");
console.log("");
console.log("=== Platform environment ===");
console.log(`API_CONSUMER_KEY_HASHES='${JSON.stringify(hashes)}'`);
console.log(`METERING_ADMIN_KEY_HASH=${hashApiKey(adminKey)}`);
console.log("RATE_LIMIT_REQUESTS_PER_MINUTE=20");
console.log("");
console.log("=== Website environment ===");
console.log(
  `CS1_TUTOR_API_KEY=${plaintext.fakeclient1 ?? Object.values(plaintext)[0]}`
);
console.log("");
console.log("=== Private practice keys ===");
if (plaintext.fakeclient2) {
  console.log(`FAKECLIENT2_API_KEY=${plaintext.fakeclient2}`);
}
console.log(`METERING_ADMIN_KEY=${adminKey}`);
