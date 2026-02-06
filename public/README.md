# Public Assets Directory

This directory contains static assets that are served directly by the web server.

## Directory Structure

```
public/
├── images/
│   ├── instruments/    # Instrument photos and images
│   └── experts/        # Expert/artist profile photos
├── audio/              # Audio recordings of instruments
├── models/             # 3D model files (.glb, .gltf)
└── videos/             # Video tutorials and performances
```

## Asset Guidelines

### Images (images/)

**Instruments:**
- Format: JPG or PNG
- Minimum size: 1200x800px
- Recommended: 1920x1280px
- Compression: Optimize for web (60-80% quality)
- Naming: `instrument-name-angle.jpg` (e.g., `madal-front.jpg`)

**Experts:**
- Format: JPG or PNG
- Size: 800x800px (square)
- Professional, clear photos
- Naming: `expert-name.jpg` (e.g., `jhalak-gandharva.jpg`)

### Audio (audio/)

- Format: MP3 (preferred) or WAV
- Bitrate: 192-320 kbps for MP3
- Sample rate: 44.1 kHz or 48 kHz
- Mono or Stereo
- Length: 30-120 seconds for samples
- Naming: `instrument-name-sample.mp3` (e.g., `madal-sample.mp3`)

### 3D Models (models/)

- Format: GLB (preferred) or GLTF
- Optimized for web (< 5MB if possible)
- Include textures in the file
- Proper geometry and materials
- Naming: `instrument-name.glb` (e.g., `sarangi.glb`)

**Optimization Tips:**
- Use Blender or other 3D software to optimize
- Reduce polygon count where possible
- Compress textures
- Use Draco compression for GLTF

### Videos (videos/)

- Format: MP4 (H.264 codec)
- Resolution: 1080p preferred, 720p minimum
- Aspect ratio: 16:9
- Bitrate: 2-5 Mbps
- Include subtitles if spoken content
- Naming: `expert-name-topic.mp4` (e.g., `jhalak-sarangi-technique.mp4`)

## Asset Organization

### Naming Conventions

Use lowercase with hyphens:
- ✅ `madal-front.jpg`
- ✅ `sarangi-sample.mp3`
- ❌ `Madal_Front.jpg`
- ❌ `Sarangi Sample.mp3`

### File Management

1. **Before Adding:**
   - Verify file quality and format
   - Optimize file size
   - Check copyright/licensing

2. **Attribution:**
   - Keep a record of sources
   - Get proper permissions
   - Credit photographers/musicians

3. **Backup:**
   - Keep original high-quality versions
   - Document metadata
   - Use version control for tracking

## Usage in Code

Reference public assets directly from the root:

```jsx
// Images
<img src="/images/instruments/madal.jpg" alt="Madal" />

// Audio
<audio src="/audio/madal-sample.mp3" />

// 3D Models
<Viewer3D modelSrc="/models/madal.glb" />
```

## Placeholder Assets

Until real assets are added, use placeholders:
- Image placeholders: https://via.placeholder.com/
- Audio: Silent audio or test tones
- 3D: Simple geometric shapes

## Future Considerations

- Implement CDN for media delivery
- Set up cloud storage (AWS S3, Cloudinary)
- Implement lazy loading
- Add image optimization pipeline
- Consider WebP format for images
- Use responsive images (srcset)

## Asset Contribution

To contribute assets:
1. Follow the guidelines above
2. Get proper permissions/rights
3. Submit via pull request
4. Include metadata and attribution
5. See CONTRIBUTING.md for details

---

**Note:** This directory is currently empty. Add your media assets here following the guidelines above.
