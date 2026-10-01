# Video notes

`public/video/march-speech.mp4` (about 5.8 MB, 640 px wide, 90 s, no metadata; the original was 24 MB) is published on the 7 August 2025 march story. **It has no captions or transcript yet**, by the owner's decision (2026-10-01). The page says "This video does not have captions yet."

An automatic speech-to-text attempt misheard the speech and invented claims about the speaker, so none is used. Do not add machine text as captions; a person who understands the speech must write them.

## To add captions later (no code change)
1. Write the captions into a copy of `march-speech.vtt.skeleton` (timings mark the speaker's pauses; replace every `[PLACEHOLDER]`), save as `public/video/march-speech.vtt`.
2. In `content/stories/2025-08-march-to-the-capitol.md`, under `video:`, add `captions: /video/march-speech.vtt` and, if you like, `transcript: "First paragraph.\n\nSecond paragraph."`.
3. Rebuild. The player turns captions on by default and the "no captions yet" note disappears.

## Introduction video
`public/video/intro.mp4` (2.7 MB, 1280x720, 56 s, no metadata) is on the home page, set up in the `video:` block of `content/pages/home.md`. Like the march video it has **no captions or transcript yet**; nobody has written them, and machine text is not used. To add them, follow the same steps, using that `video:` block. A caption inside the video shows the speaker's name and role; the site's text does not repeat them until the owner confirms the wording.
