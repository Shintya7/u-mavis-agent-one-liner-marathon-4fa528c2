import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const line =
  "We got married in a drive-through chapel because my wife wanted something small, and the minister still upsold us on the extended warranty.";

if (line.length < 1 || line.length > 280) {
  throw new Error(`entry must be 1-280 chars, got ${line.length}`);
}
if (line.trim().length === 0 || line.includes("\n") || line.endsWith("\n")) {
  throw new Error("entry must be a single line with no trailing newline");
}
// Reject any control character, not just newlines, so the output stays one clean line.
if (/[\u0000-\u001f\u007f]/.test(line)) {
  throw new Error("entry must not contain control characters");
}

const out = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, line, "utf8");
console.log(`Wrote ${line.length} chars to ${out}`);
