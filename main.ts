// Day one, day seven — entry program (Node 22, standard library only).
//
// The entry is the TikTok video: VIDEO.json at the repository root names the
// video's full address. This program reads that file, checks it names a
// TikTok video (or the placeholder, before the video is posted), and copies
// it byte for byte to the output directory, where the house's gate reads it.
// It does nothing else: no network, no dependencies, no writes besides the
// one copy. The copy is deterministic — the same VIDEO.json always yields
// the same bytes out.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const VIDEO_FILE = 'VIDEO.json';

// The gate refuses VIDEO.json over 16 KiB; refuse early instead of handing
// it an entry its own gate would refuse.
const MAX_BYTES = 16 * 1024;

// A TikTok video address, as the browser shows it: the handle, /video/ and
// digits only for the id. A query or fragment after it is fine; a short link
// (vm.tiktok.com, vt.tiktok.com, tiktok.com/t/...) or a photo address is not.
// The mobile form m.tiktok.com/v/<id>.html counts too, as the rules allow.
const TIKTOK_VIDEO_URL =
  /^https:\/\/(www\.|m\.)?tiktok\.com\/@[^/\s]+\/video\/\d+\/?(\?[^\s#]*)?(#[^\s]*)?$|^https:\/\/m\.tiktok\.com\/v\/\d+\.html(\?[^\s#]*)?(#[^\s]*)?$/;

// The placeholder, kept until the video is posted: it copies through with a
// warning so the entry can be tested before posting, but the gate refuses it
// as it stands — replace it with the real address before submitting.
const PLACEHOLDER_URL = 'https://www.tiktok.com/@<handle>/video/<id>';

const videoPath = join(BOT_DIR, VIDEO_FILE);
let text;
try {
  const info = statSync(videoPath);
  if (info.size > MAX_BYTES) {
    console.error(`${VIDEO_FILE} is ${info.size} bytes, over the ${MAX_BYTES} byte cap`);
    process.exit(1);
  }
  text = readFileSync(videoPath, 'utf8');
} catch (err) {
  console.error(`${VIDEO_FILE} could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

let video;
try {
  video = JSON.parse(text);
} catch (err) {
  console.error(`${VIDEO_FILE} is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof video !== 'object' || video === null || Array.isArray(video) || typeof video.url !== 'string') {
  console.error(`${VIDEO_FILE} must be a JSON object with a string "url"`);
  process.exit(1);
}

if (video.url === PLACEHOLDER_URL) {
  console.error(`warning: ${VIDEO_FILE} still holds the placeholder address — replace it with the posted video's address before submitting`);
} else if (!TIKTOK_VIDEO_URL.test(video.url)) {
  console.error(`${VIDEO_FILE} does not name a TikTok video: ${video.url}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(videoPath, join(OUTPUT_DIR, VIDEO_FILE));
} catch (err) {
  console.error(`${VIDEO_FILE} could not be copied to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
console.log(`copied ${VIDEO_FILE} to ${OUTPUT_DIR}`);
