# Video waiting for captions: the march speech

`march-speech.mp4` is a speaker addressing the crowd at the 7 August 2025 march (90 seconds). It is compressed to about 5.8 MB (the original was 24 MB), has no metadata, and is **deliberately not served by the site yet**, because a video may only be published with reviewed captions and a transcript.

An automatic speech-to-text attempt was made and discarded: it misheard the speech and invented claims about the speaker (a role, a trip). Do not use machine text as captions. A person who understands the speech must write them.

## To publish it
1. Listen to the original and write the captions into `march-speech.vtt` (replace every `[PLACEHOLDER]`; keep cues short).
2. Write the transcript: the same words as plain paragraphs, separated by a blank line.
3. Check both against the original, with a second person if possible. Check that no claim about any person is added.
4. Move `march-speech.mp4` and `march-speech.vtt` into `public/video/`.
5. In `content/stories/2025-08-march-to-the-capitol.md` add, under `images:`:
```yaml
video:
  src: /video/march-speech.mp4
  poster: ../../src/assets/photos/march-video-poster.jpg
  posterAlt: "A speaker in a black cap and T-shirt gestures while speaking; other marchers stand beside him in front of trees with yellow blossom."
  captions: /video/march-speech.vtt
  transcript: "First paragraph of the transcript.\n\nSecond paragraph."
  title: "A speaker addresses the crowd at the march"
  duration: "1 min 30 s"
  captionsReviewed: true
```
The build refuses a video without captions, a transcript and `captionsReviewed: true`. The player does not autoplay, downloads nothing until someone presses play, and shows captions by default.

Consent: the owner confirmed the same consent for the march photos applies; confirm it also covers the video and its audio.
