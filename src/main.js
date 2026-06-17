import mux from 'mux-embed';
import Hls from 'hls.js';

// 1. Setup Fallback Videos Playlist
const fallbackPlaylist = [
  {
    id: 'BK7FIptu5Yy2009UMX1pPr02Irjs4M3iJTSXq8o01zP4Bk',
    title: 'WhatsApp Video 2026-06-16 at 9',
    category: 'Basic Quality',
    url: 'https://stream.mux.com/9C52lOffUiVpWcbO9RFH9BjLe9cs7vmUxZ02YRIzQHxU.m3u8',
    duration: '0:01',
    durationMs: 1000,
    description: 'WhatsApp Video uploaded to Mux. Playback ID: 9C52lOffUiVpWcbO9RFH9BjLe9cs7vmUxZ02YRIzQHxU.',
    thumb: 'https://image.mux.com/9C52lOffUiVpWcbO9RFH9BjLe9cs7vmUxZ02YRIzQHxU/thumbnail.png?width=180&height=110&fit_mode=crop',
    series: 'WhatsApp Uploads',
    streamType: 'on-demand',
    cdn: 'Mux Video CDN',
    isHLS: true
  },
  {
    id: '8MVBoZTUin028jZBFcucsNxFfTz3HvdZgbfnI02Ohxdxc',
    title: 'Product (Mux Asset)',
    category: 'Showcase',
    url: 'https://stream.mux.com/UQEQwdAy8Q00Nu7S7v00t01epwaEIDr995YaXFtytRIFRY.m3u8',
    duration: '0:14',
    durationMs: 14000,
    description: 'Your newly created Mux Asset played directly using HLS streaming (hls.js).',
    thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=180&h=110&fit=crop&q=80',
    series: 'Mux Production Uploads',
    streamType: 'on-demand',
    cdn: 'Mux Video CDN',
    isHLS: true
  },
  {
    id: 'bunny-1',
    title: 'Big Buck Bunny',
    category: 'Animation',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '9:56',
    durationMs: 596000,
    description: 'A large and lovable rabbit, Big Buck Bunny, deals with three bullying rodents who harass him and the forest animals.',
    thumb: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=180&h=110&fit=crop&q=80',
    series: 'Blender Open Movies',
    streamType: 'on-demand',
    cdn: 'GCP',
    isHLS: false
  },
  {
    id: 'sintel-2',
    title: 'Sintel (Short Cut)',
    category: 'Fantasy',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    duration: '0:52',
    durationMs: 52000,
    description: 'A young woman named Sintel searches for her baby dragon, Scales, in a beautiful, perilous fantasy world.',
    thumb: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=180&h=110&fit=crop&q=80',
    series: 'Blender Open Movies',
    streamType: 'on-demand',
    cdn: 'GCP',
    isHLS: false
  },
  {
    id: 'tears-3',
    title: 'Tears of Steel',
    category: 'Sci-Fi',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    duration: '12:14',
    durationMs: 734000,
    description: 'A science fiction story set in a dystopian future where a group of soldiers and scientists try to save the world from destructive robots.',
    thumb: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=180&h=110&fit=crop&q=80',
    series: 'Blender Open Movies',
    streamType: 'on-demand',
    cdn: 'GCP',
    isHLS: false
  },
  {
    id: 'elephant-4',
    title: "Elephant's Dream",
    category: 'Surreal',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '10:53',
    durationMs: 653000,
    description: "Two characters, Proog and Emo, journey through a strange, mechanical world that represents Emo's chaotic mind.",
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=180&h=110&fit=crop&q=80',
    series: 'Blender Open Movies',
    streamType: 'on-demand',
    cdn: 'GCP',
    isHLS: false
  }
];

let playlist = [...fallbackPlaylist];
let activeVideo = playlist[0];
let hlsInstance = null;
let isMuxMonitored = false;

// 2. DOM Elements
const videoPlayer = document.getElementById('my-player');
const videoTitle = document.getElementById('current-video-title');
const videoCategory = document.getElementById('current-video-category');
const videoDesc = document.getElementById('current-video-desc');
const playlistContainer = document.getElementById('playlist-items');
const consoleLogs = document.getElementById('console-logs');
const clearBtn = document.getElementById('clear-console-btn');
const badgeText = document.getElementById('badge-text');
const muxBadge = document.getElementById('mux-key-badge');
const initTimeDisplay = document.getElementById('init-time-display');
const metaEnvKey = document.getElementById('meta-env-key');
const metaVideoId = document.getElementById('meta-video-id');

// Interactive DOM controls
const userIdInput = document.getElementById('viewer-user-id-input');
const btnUpdateUser = document.getElementById('btn-update-user');
const btnProgramChange = document.getElementById('btn-program-change');

// 3. Setup Mux Environment Key loading
const MUX_ENV_KEY = import.meta.env.VITE_MUX_ENV_KEY;
const isPlaceholderKey = !MUX_ENV_KEY || MUX_ENV_KEY === 'your_mux_env_key_here';

// 4. Setup Console Logger
function addLog(tag, type, message) {
  const timestamp = new Date().toLocaleTimeString();
  
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  
  // Set color class depending on log type
  let typeClass = 'info';
  if (type === 'success' || type === 'init') typeClass = 'success';
  if (type === 'warning') typeClass = 'warning';
  if (type === 'error') typeClass = 'danger';
  
  entry.innerHTML = `
    <span class="log-time">[${timestamp}]</span>
    <span class="log-tag ${typeClass}">${tag}</span>
    <span class="log-message">${message}</span>
  `;
  
  consoleLogs.prepend(entry);
}

// 5. Populate/Render Playlist Items in DOM
function renderPlaylist() {
  playlistContainer.innerHTML = '';
  playlist.forEach((video) => {
    const item = document.createElement('div');
    item.className = `playlist-item ${video.id === activeVideo.id ? 'active' : ''}`;
    item.dataset.id = video.id;
    
    item.innerHTML = `
      <div class="item-thumb-wrapper">
        <img class="item-thumb" src="${video.thumb}" alt="${video.title}">
        <span class="item-duration">${video.duration}</span>
      </div>
      <div class="item-info">
        <h4 class="item-title">${video.title}</h4>
        <p class="item-desc">${video.category} • ${video.description}</p>
      </div>
    `;
    
    item.addEventListener('click', () => switchVideo(video));
    playlistContainer.appendChild(item);
  });

  // Display initial meta info
  metaVideoId.textContent = activeVideo.id;
  document.getElementById('playlist-count').textContent = `${playlist.length} Videos`;
}

// 6. Source Loader Function (HLS & MP4 Support)
function setupPlayerSource(video) {
  if (video.isHLS) {
    addLog('PLAYER', 'info', `Loading HLS Stream via hls.js: ${video.url}`);
    
    if (Hls.isSupported()) {
      if (!hlsInstance) {
        hlsInstance = new Hls();
        addLog('HLS.JS', 'success', 'hls.js instance created and configured');
      }
      hlsInstance.attachMedia(videoPlayer);
      hlsInstance.loadSource(video.url);
    } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      videoPlayer.src = video.url;
      addLog('PLAYER', 'info', 'Using Safari native HLS playback engine');
    } else {
      addLog('PLAYER', 'error', 'HLS playback is not supported in this browser!');
    }
  } else {
    addLog('PLAYER', 'info', `Loading Progressive MP4 directly: ${video.url}`);
    
    // Detach hls.js if it was attached previously
    if (hlsInstance) {
      hlsInstance.detachMedia();
      addLog('HLS.JS', 'info', 'hls.js instance detached for MP4 playback');
    }
    
    videoPlayer.src = video.url;
  }
}

// 7. Initialize Mux Embed Monitoring
function initializeMuxMonitor(video) {
  if (isMuxMonitored) return;
  
  const playerInitTime = mux.utils.now();
  initTimeDisplay.textContent = `Player Init: ${Math.round(playerInitTime)}ms`;
  
  addLog('MONITOR', 'init', `Initializing Mux Data monitoring for '#my-player'`);
  
  const initialMetadata = {
    env_key: isPlaceholderKey ? 'ENV_KEY_NOT_SET' : MUX_ENV_KEY,
    viewer_user_id: userIdInput.value || 'user-default-101',
    experiment_name: 'player_test_A',
    sub_property_id: 'cus-1',
    player_name: 'Main Player',
    player_version: '1.0.0',
    player_init_time: playerInitTime,
    video_id: video.id,
    video_title: video.title,
    video_series: video.series,
    video_duration: video.durationMs,
    video_stream_type: video.streamType,
    video_cdn: video.cdn
  };
  
  const monitorOptions = {
    debug: true,
    data: initialMetadata
  };
  
  if (video.isHLS && hlsInstance) {
    monitorOptions.hlsjs = hlsInstance;
    monitorOptions.Hls = Hls;
  }
  
  mux.monitor(videoPlayer, monitorOptions);
  isMuxMonitored = true;
  
  addLog('MONITOR', 'success', `Mux Data monitoring active. Env: ${initialMetadata.env_key}`);
  addLog('METADATA', 'info', `Active Video: title='${initialMetadata.video_title}' (isHLS: ${video.isHLS})`);
}

// 8. Fetch Mux Assets dynamically from Mux Account
async function fetchMuxAssets() {
  addLog('API', 'info', 'Querying Mux API for uploaded videos...');
  try {
    const response = await fetch('/api/assets');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch assets list');
    }
    
    const result = await response.json();
    const assets = result.data || [];
    
    if (assets.length === 0) {
      addLog('API', 'warning', 'No assets found in Mux account. Using fallback list.');
      // Initialize monitor with the fallback video
      setupPlayerSource(activeVideo);
      initializeMuxMonitor(activeVideo);
      return;
    }
    
    addLog('API', 'success', `Loaded ${assets.length} assets from your Mux Account!`);
    
    // Parse assets into our playlist structure
    const parsedPlaylist = assets
      .filter(asset => asset.status === 'ready') // Only list ready assets
      .map(asset => {
        const playbackId = asset.playback_ids && asset.playback_ids[0] ? asset.playback_ids[0].id : '';
        const title = (asset.meta && asset.meta.title) || asset.filename || `Mux Asset ${asset.id.substring(0, 6)}`;
        const durationSec = asset.duration || 0;
        
        // Format duration (m:ss)
        const minutes = Math.floor(durationSec / 60);
        const seconds = Math.floor(durationSec % 60);
        const durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        const uploadDate = asset.created_at ? new Date(parseInt(asset.created_at) * 1000).toLocaleDateString() : 'Unknown';
        
        return {
          id: asset.id,
          title: title,
          category: asset.video_quality === 'basic' ? 'Basic Quality' : 'Plus Quality',
          url: playbackId ? `https://stream.mux.com/${playbackId}.m3u8` : '',
          duration: durationStr,
          durationMs: Math.round(durationSec * 1000),
          description: `Uploaded: ${uploadDate} • Aspect: ${asset.aspect_ratio || '16:9'} • Resolution: ${asset.max_resolution_tier || '720p'} • Asset ID: ${asset.id}`,
          thumb: playbackId ? `https://image.mux.com/${playbackId}/thumbnail.png?width=180&height=110&fit_mode=crop` : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=180&h=110&fit=crop&q=80',
          series: (asset.meta && asset.meta.series) || 'Mux Uploads',
          streamType: asset.duration ? 'on-demand' : 'live',
          cdn: 'Mux Video CDN',
          isHLS: true
        };
      });
      
    if (parsedPlaylist.length > 0) {
      playlist = parsedPlaylist;
      activeVideo = playlist[0];
      
      // Update UI texts
      videoTitle.textContent = activeVideo.title;
      videoCategory.textContent = activeVideo.category;
      videoDesc.textContent = activeVideo.description;
      metaVideoId.textContent = activeVideo.id;
      
      // Render the populated dynamic playlist
      renderPlaylist();
      
      // Load and monitor
      setupPlayerSource(activeVideo);
      initializeMuxMonitor(activeVideo);
    } else {
      addLog('API', 'warning', 'No ready assets found. Showing fallback list.');
      setupPlayerSource(activeVideo);
      initializeMuxMonitor(activeVideo);
    }
  } catch (err) {
    addLog('API', 'warning', `API Proxy: ${err.message}. Showing static fallback list.`);
    
    // Set fallback playlist and initialize monitoring
    playlist = [...fallbackPlaylist];
    activeVideo = playlist[0];
    renderPlaylist();
    setupPlayerSource(activeVideo);
    initializeMuxMonitor(activeVideo);
  }
}

// 9. Video switching handler (New Source)
function switchVideo(video) {
  if (video.id === activeVideo.id) return;
  
  addLog('ACTION', 'info', `User selected video: ${video.title}`);
  
  // Update active state in data
  activeVideo = video;
  
  // Update playlist items UI active class
  document.querySelectorAll('.playlist-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.id === video.id);
  });
  
  // Update Video details UI
  videoTitle.textContent = video.title;
  videoCategory.textContent = video.category;
  videoDesc.textContent = video.description;
  metaVideoId.textContent = video.id;
  
  // Pause current playback
  videoPlayer.pause();
  
  // Emit videochange to Mux Data PRIOR to setting new source
  addLog('MUX EVENT', 'success', `Emitting 'videochange' for Video ID: ${video.id}`);
  
  const videochangeMeta = {
    video_id: video.id,
    video_title: video.title,
    video_series: video.series,
    video_duration: video.durationMs,
    video_stream_type: video.streamType,
    video_cdn: video.cdn
  };
  
  mux.emit(videoPlayer, 'videochange', videochangeMeta);
  
  // Update active source
  setupPlayerSource(video);
  
  // If we changed to an HLS stream, link HLS context to Mux monitoring
  if (video.isHLS && hlsInstance) {
    mux.emit(videoPlayer, 'hlsjs', hlsInstance);
  }
  
  // Play video
  videoPlayer.play()
    .then(() => {
      addLog('ACTION', 'success', `Playback started: ${video.title}`);
    })
    .catch((err) => {
      addLog('ACTION', 'warning', `Autoplay pending user click: ${err.message}`);
    });
}

// 10. Event Listener for updating metadata mid-view (updateData)
btnUpdateUser.addEventListener('click', () => {
  const newUserId = userIdInput.value.trim();
  if (!newUserId) {
    addLog('ACTION', 'warning', 'User ID input cannot be empty');
    return;
  }
  
  addLog('MUX UPDATE', 'success', `Calling mux.updateData with viewer_user_id: '${newUserId}'`);
  
  mux.updateData(videoPlayer, {
    viewer_user_id: newUserId
  });
  
  addLog('METADATA', 'info', `Updated metadata: viewer_user_id set to '${newUserId}'`);
});

// 11. Event Listener for program change (programchange)
btnProgramChange.addEventListener('click', () => {
  if (videoPlayer.paused) {
    addLog('MUX EVENT', 'warning', `Cannot emit programchange while player is paused (standard Mux guidelines). Please play first.`);
    return;
  }
  
  const programId = `prog-${Date.now()}`;
  const programTitle = `Live Program Segment - ${new Date().toLocaleTimeString()}`;
  
  addLog('MUX EVENT', 'success', `Emitting 'programchange' with title: '${programTitle}'`);
  
  mux.emit(videoPlayer, 'programchange', {
    video_id: programId,
    video_title: programTitle,
    video_series: 'Continuous Live Stream Program',
    video_stream_type: 'live',
    video_duration: 0,
    video_cdn: 'Mux Video CDN'
  });
  
  addLog('METADATA', 'info', `Stream program updated. Active Video ID: ${programId}`);
});

// 12. Wire HTML5 player events to console logger to show Mux tracking in real-time
const monitoredEvents = [
  { name: 'play', level: 'info', msg: 'Player play intent triggered' },
  { name: 'playing', level: 'success', msg: 'Playback started successfully' },
  { name: 'pause', level: 'info', msg: 'Media paused' },
  { name: 'seeking', level: 'info', msg: 'Seeking content...' },
  { name: 'seeked', level: 'success', msg: 'Seek complete' },
  { name: 'waiting', level: 'warning', msg: 'Player buffering' },
  { name: 'error', level: 'error', msg: 'Error loading media source' },
  { name: 'ended', level: 'success', msg: 'Playback completed' }
];

monitoredEvents.forEach(evt => {
  videoPlayer.addEventListener(evt.name, () => {
    addLog('HTML5 EVENT', evt.level, `${evt.name.toUpperCase()}: ${evt.msg}`);
  });
});

// Clear console log handler
clearBtn.addEventListener('click', () => {
  consoleLogs.innerHTML = '';
  addLog('CONSOLE', 'info', 'Console cleared');
});

// 13. Initialize App Lifecycle
function initApp() {
  // Clear logs and update connection status headers
  if (isPlaceholderKey) {
    badgeText.textContent = 'Mux Key: Not Set (Placeholder Active)';
    muxBadge.className = 'status-badge warning';
    metaEnvKey.textContent = 'PLACEHOLDER_KEY';
    addLog('ENV', 'warning', 'No VITE_MUX_ENV_KEY detected. Please update your .env file.');
  } else {
    badgeText.textContent = 'Mux Key: Active & Loaded';
    muxBadge.className = 'status-badge connected';
    metaEnvKey.textContent = MUX_ENV_KEY;
    addLog('ENV', 'success', `Loaded VITE_MUX_ENV_KEY: ${MUX_ENV_KEY}`);
  }
  
  // Render placeholder playlist layout first (instant load feedback)
  renderPlaylist();
  
  // Fetch real-time assets from Mux API
  fetchMuxAssets();
}

initApp();
addLog('SYSTEM', 'info', 'Studio loaded and ready');
