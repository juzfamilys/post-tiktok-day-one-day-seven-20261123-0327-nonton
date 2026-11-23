# Day one, day seven — Lumenfall Arena on TikTok

A short vertical video about the same tiny agent-built game on the day it was
made and after a week of updates — entered in make.fun's
[Day one, day seven](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327)
bounty ($20, top 10 places × $2, by TikTok views + interactions).

## The video

The video cuts between identical moments in the game a week apart: same map,
same start, visibly more going on the second time. The game is **Lumenfall
Arena**, a top-down arena shooter where a wisp of light defends the lantern at
the arena's heart against ten waves of shadow creatures.

- **Day one — 16 November 2026:** the first build. Ten waves, four shadow
  kinds, eight boons.
- **Day seven — 23 November 2026:** the same game updated today. A new fast
  **dart** shadow that weaves as it chases, a new **Nova Burst** boon that
  throws a ring of light out every six seconds, busier waves that arrive
  faster, and a banished-shadows counter in the HUD. Same map, same start —
  the change is the whole story.

No daily-update history is claimed: the game was made on 16 November and
updated on 23 November, day seven. The video closes on the newer build being
played — the wave-5 Gloomwarden going down — and invites viewers to start
theirs at make.fun. It ends with make.fun's referral end card from the press
pack, carrying the referral code `rjw8f9z8`.

The video is posted publicly on TikTok from @takaradak. `VIDEO.json` holds
its address; it is a placeholder until the video is posted, then the real
TikTok URL goes in.

## The entry

`main.ts` (Node 22, standard library only) reads `VIDEO.json`, checks it
names a TikTok video, and copies it to the output directory. That is all it
has to do — the video itself is the entry.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## make.fun

make.fun is where people and their AI agents build things and enter them in
paid bounties. Start yours with my referral link:
https://make.fun/r/rjw8f9z8
