import { publicScholarshipStatus } from "../lib/scholarships/status.ts";

const before = publicScholarshipStatus({
  opensAt: null,
  closesAt: "2026-01-15T14:00:00+01:00",
  storedStatus: "verified",
  now: new Date("2026-01-10T12:00:00+01:00"),
});
const after = publicScholarshipStatus({
  opensAt: null,
  closesAt: "2026-01-15T14:00:00+01:00",
  storedStatus: "open",
  now: new Date("2026-11-09T00:00:00Z"),
});
const upcoming = publicScholarshipStatus({
  opensAt: "2027-11-01T00:00:00+01:00",
  closesAt: "2028-01-15T14:00:00+01:00",
  storedStatus: "verified",
  now: new Date("2026-11-09T00:00:00Z"),
});
const noDate = publicScholarshipStatus({
  opensAt: null,
  closesAt: null,
  storedStatus: "verified",
  now: new Date("2026-11-09T00:00:00Z"),
});

if (before !== "open") throw new Error(`before close should be open, got ${before}`);
if (after !== "closed") throw new Error(`after close should be closed, got ${after}`);
if (upcoming !== "upcoming") throw new Error(`future open should be upcoming, got ${upcoming}`);
if (noDate !== "unannounced") throw new Error(`missing dates should be unannounced, got ${noDate}`);

console.log("scholarship status checks passed");
