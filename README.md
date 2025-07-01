# Riyaaaz - Music Player

A Spotify-like music player built with HTML, CSS, and JavaScript.

**🚀 Live Demo**: [https://riyaaz.netlify.app/](https://riyaaz.netlify.app/)
**📦 GitHub**: [https://github.com/deveshvyas1/Music_Player-Riaaz](https://github.com/deveshvyas1/Music_Player-Riaaz)

## ✨ Features

- 🎵 **Music Playback**: Play/Pause with full audio controls
- ⏭️ **Navigation**: Next/Previous track with seamless transitions  
- 🎚️ **Volume Control**: Interactive slider with mute/unmute functionality
- 🔊 **Dynamic Icons**: Volume icons change based on level (high/low/mute)
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🎨 **Modern UI**: Spotify-inspired dark theme with smooth animations
- 🎯 **Interactive Seek Bar**: Click to jump to any part of the song
- 📁 **Organized Library**: Songs organized by artist folders
- 🎼 **Song Info Display**: Shows current song and time progress

## 🚀 Deployment

### GitHub Repository
Your project is now live on GitHub at: `https://github.com/deveshvyas1/Music_Player-Riaaz`

### Deploy to Netlify (Easy Method)
1. **Visit Netlify**: Go to [netlify.com](https://netlify.com) and sign up/login
2. **Connect GitHub**: Click "New site from Git" → "GitHub" 
3. **Select Repository**: Choose `deveshvyas1/Music_Player-Riaaz`
4. **Deploy Settings**:
   - Build command: `(leave empty)`
   - Publish directory: `(leave empty or put ".")`
5. **Deploy**: Click "Deploy site"
6. **Custom Domain** (optional): Change the random domain to something like `riyaaz-music-player.netlify.app`

### Alternative Deployment Options
- **Vercel**: Import from GitHub at [vercel.com](https://vercel.com)
- **GitHub Pages**: Enable in repository Settings → Pages
- **Firebase Hosting**: Use `firebase deploy` after setup

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
