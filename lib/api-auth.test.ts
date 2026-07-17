import test from "node:test";
import assert from "node:assert/strict";
import {
  authenticateConsumerToken,
  hashApiKey,
} from "./api-auth.ts";

const consumerHashes = JSON.stringify({
  fakeclient1: hashApiKey("client-one-secret"),
  fakeclient2: hashApiKey("client-two-secret"),
});

test("authenticates a configured consumer without trusting a client-supplied id", () => {
  assert.deepEqual(
    authenticateConsumerToken("client-two-secret", consumerHashes),
    { ok: true, consumerId: "fakeclient2" }
  );
});

test("rejects a missing token", () => {
  assert.deepEqual(authenticateConsumerToken(null, consumerHashes), {
    ok: false,
    status: 401,
    error: "Missing API key.",
  });
});

test("rejects an invalid token", () => {
  assert.deepEqual(
    authenticateConsumerToken("not-a-real-key", consumerHashes),
    {
      ok: false,
      status: 401,
      error: "Invalid API key.",
    }
  );
});

test("fails closed when consumer configuration is missing", () => {
  assert.deepEqual(authenticateConsumerToken("any-key", undefined), {
    ok: false,
    status: 500,
    error: "API consumer authentication is not configured.",
  });
});

test("fails closed when consumer configuration is invalid JSON", () => {
  assert.deepEqual(authenticateConsumerToken("any-key", "{invalid"), {
    ok: false,
    status: 500,
    error: "API consumer authentication is misconfigured.",
  });
});
