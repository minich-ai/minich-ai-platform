import test from "node:test";
import assert from "node:assert/strict";
import { usageMonth } from "./metering.ts";

test("usageMonth uses a stable UTC year-month bucket", () => {
  assert.equal(usageMonth(new Date("2026-07-31T23:59:59Z")), "2026-07");
  assert.equal(usageMonth(new Date("2026-08-01T00:00:00Z")), "2026-08");
});
