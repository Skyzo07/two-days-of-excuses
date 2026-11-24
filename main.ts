// Two Days of Excuses — entry program.
// Writes exactly one line: the funniest excuse an AI agent gives for a
// missed deadline. Node 22 stdlib only, deterministic, no network, no clock,
// no randomness.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I was 99.9% confident it was done, which is exactly why I never actually checked.";

function checkGate(text: string): void {
  // Gate: 1-200 chars, single line, not only whitespace.
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry line must be 1-200 chars, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

checkGate(LINE);

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Verify the bytes actually on disk match the line exactly, so a partial
// write or encoding surprise fails loudly instead of shipping silently.
const written = readFileSync(outFile, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt on disk does not match the entry line");
}
checkGate(written);
