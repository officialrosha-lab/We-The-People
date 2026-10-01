# Video notes

`public/video/march-speech.mp4` (about 5.8 MB, 640 px wide, 90 s, no metadata; the original was 24 MB) is published on the 7 August 2025 march story. **It has no captions or transcript yet**, by the owner's decision (2026-10-01). The page says "This video does not have captions yet."

An automatic speech-to-text attempt misheard the speech and invented claims about the speaker, so none is used. Do not add machine text as captions; a person who understands the speech must write them.

## To add captions later (no code change)
1. Write the captions into a copy of `march-speech.vtt.skeleton` (timings mark the speaker's pauses; replace every `[PLACEHOLDER]`), save as `public/video/march-speech.vtt`.
2. In `content/stories/2025-08-march-to-the-capitol.md`, under `video:`, add `captions: /video/march-speech.vtt` and, if you like, `transcript: "First paragraph.\n\nSecond paragraph."`.
3. Rebuild. The player turns captions on by default and the "no captions yet" note disappears.
