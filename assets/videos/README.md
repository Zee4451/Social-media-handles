# Video Gallery Files

## Required Files

### Video Files:
- `performance-video-1.mp4` - Award Ceremony video
- `performance-video-2.mp4` - Special Event video

### Poster Images (Thumbnails):
- `video-1-poster.jpg` - Thumbnail for video 1 (1200x800px)
- `video-2-poster.jpg` - Thumbnail for video 2 (1200x800px)

## Video Specifications

### Format:
- **Recommended:** MP4 (H.264 codec + AAC audio)
- **Alternative:** WebM (VP9 codec + Opus audio) for better compression
- **Fallback:** Provide both MP4 and WebM for maximum compatibility

### Resolution:
- **Recommended:** 1920x1080 (Full HD)
- **Acceptable:** 1280x720 (HD)
- **Maximum:** 1920x1080 (don't go higher for web performance)

### File Size:
- **Target:** 5-10 MB per video
- **Maximum:** 15 MB per video
- **Optimization:** Use HandBrake (free) to compress videos

### Duration:
- **Recommended:** 30 seconds - 2 minutes
- **Maximum:** 3 minutes (keep it engaging)

## How to Optimize Videos

### Option 1: Using HandBrake (Recommended)
1. Download HandBrake: https://handbrake.fr/
2. Open your video file
3. Use these settings:
   - **Format:** MP4
   - **Video Codec:** H.264
   - **Quality:** RF 22-24 (good quality/size balance)
   - **Resolution:** 1920x1080 or 1280x720
   - **Audio:** AAC, 128kbps
4. Export and replace the file

### Option 2: Online Compressor
1. Visit: https://www.veed.io/tools/video-compressor
2. Upload your video
3. Choose "Medium" quality
4. Download optimized version

### Option 3: FFmpeg (Advanced)
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 23 -preset medium -vf scale=1920:1080 -acodec aac -b:a 128k output.mp4
```

## How to Create Poster Images

### From Video Frame:
1. Open video in VLC Media Player
2. Pause at a good frame
3. Video → Take Snapshot
4. Resize to 1200x800px
5. Save as `video-1-poster.jpg` or `video-2-poster.jpg`

### From Photo:
1. Use a high-quality photo from the performance
2. Resize to 1200x800px
3. Save as JPEG (quality 80-85%)

## File Naming Convention

Keep the exact naming:
- `performance-video-1.mp4` (first video)
- `performance-video-2.mp4` (second video)
- `video-1-poster.jpg` (thumbnail for video 1)
- `video-2-poster.jpg` (thumbnail for video 2)

## Adding More Videos

If you want to add a 3rd video:

1. **In index.html:**
   - Change another gallery-item to video-item
   - Update the video source and poster paths
   - Add video badge to overlay

2. **File naming:**
   - `performance-video-3.mp4`
   - `video-3-poster.jpg`

3. **The system will auto-detect** the new video and add it to the carousel!

## Current Video Content

### Video 1: Award Ceremony
- File: `performance-video-1.mp4`
- Poster: `video-1-poster.jpg`
- Title: "Award Ceremony"
- Description: "Competition Win"

### Video 2: Special Event
- File: `performance-video-2.mp4`
- Poster: `video-2-poster.jpg`
- Title: "Special Event"
- Description: "Cultural Performance"

## Tips for Best Results

1. **Keep videos short** - Attention span is limited
2. **Use engaging thumbnails** - First impression matters
3. **Optimize file size** - Faster loading = better UX
4. **Test on mobile** - Ensure videos play on all devices
5. **Add poster images** - Shows before video loads
6. **Use good lighting** - Clear, bright videos perform better
7. **Stabilize footage** - Use tripod or stabilization software

## Troubleshooting

### Video not playing?
- Check file path is correct
- Ensure MP4 format with H.264 codec
- Check browser console for errors
- Verify video file isn't corrupted

### Video too large?
- Compress with HandBrake
- Reduce resolution to 1280x720
- Shorten video duration
- Lower bitrate to 2-3 Mbps

### Poster not showing?
- Check file path: `./videos/video-1-poster.jpg`
- Ensure image is 1200x800px
- Verify file name matches exactly
- Check image format is JPEG

## Need Help?

If you need assistance with video optimization or have questions about adding videos, just ask!
