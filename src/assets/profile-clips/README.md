# Profile theme clips

Played by `src/components/ProfilePortrait.jsx` when the theme is toggled.

| File | Plays when | First frame should match | Last frame should match |
| --- | --- | --- | --- |
| `to-light.webm` / `to-light.mp4` | dark → light | `light_mode_profile.png` (night office) | `dark_mode_profile.jpg` (light-mode still) |
| `to-dark.webm` / `to-dark.mp4` | light → dark | `dark_mode_profile.jpg` | `light_mode_profile.png` |

- Either format is enough; with both, browsers pick WebM first.
- Keep it short (2–3 s), with no audio, at the same aspect ratio as the stills (4:5).
- Make `to-dark` an exact reverse of `to-light` so toggling mid-clip reverses smoothly:

  ```
  ffmpeg -i to-light.mp4 -vf reverse -an to-dark.mp4
  ffmpeg -i to-light.mp4 -c:v libvpx-vp9 -crf 34 -b:v 0 -an to-light.webm
  ```

- If you change the light-mode look (e.g. a daytime office), replace the stills with the clip's first/last frames so there is no jump when the clip ends:

  ```
  ffmpeg -sseof -0.1 -i to-light.mp4 -frames:v 1 light_end.png
  ```

Until these files exist, the portrait just crossfades between the stills.
