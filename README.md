# Riyaaaz - Music Player

A Spotify-like music player built with HTML, CSS, and JavaScript.

Site - https://riyaaz.netlify.app/

## Features

- ✨ Modern Spotify-inspired UI
- 🎵 Play/Pause music controls
- ⏭️ Next/Previous track navigation
- 🎚️ Interactive seek bar
- 📱 Responsive sidebar navigation
- 🎨 Beautiful album artwork display

## How to Run

### Method 1: Using Python Server (Recommended)
1. Open terminal in the project directory
2. Run: `python3 server.py`
3. Open your browser and go to `http://localhost:8000`

### Method 2: Using Live Server Extension (VS Code)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"

## File Structure

```
├── index.html          # Main HTML file
├── style.css           # Styling
├── script.js           # JavaScript functionality
├── server.py           # Python server for local hosting
├── songs/              # MP3 audio files
├── img/
│   ├── icons/          # Control icons (play, pause, next, etc.)
│   ├── artist/         # Artist profile images
│   └── music_albem_photos/ # Album artwork
```

## Troubleshooting

If music doesn't play:
1. Make sure you're using a local server (not opening HTML directly)
2. Check that audio files are in the `songs/` folder
3. Ensure your browser allows audio autoplay
4. Check browser console for errors (F12)

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Audio**: HTML5 Audio API
- **Server**: Python HTTP Server (for development)

## Browser Compatibility

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅

## Credits

Created by Devesh Vyas - A Spotify clone project
