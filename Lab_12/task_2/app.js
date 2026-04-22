// Service Worker Registration and Management
let swRegistration = null;
let deferredPrompt = null;
const offlineQueue = [];

// Initialize app
if ('serviceWorker' in navigator) {
  registerServiceWorker();
} else {
  updateStatus('Not Supported', 'offline');
}

// Register Service Worker
async function registerServiceWorker() {
  try {
    swRegistration = await navigator.serviceWorker.register('./sw.js');
    console.log('✅ Service Worker registered:', swRegistration);

    updateStatus('Registered', 'online');
    updateState(swRegistration.active?.state || 'installing');

    // Listen for updates
    swRegistration.addEventListener('updatefound', () => {
      const newWorker = swRegistration.installing;
      console.log('🔄 Service Worker update found');

      newWorker.addEventListener('statechange', () => {
        updateState(newWorker.state);
      });
    });

    // Check for updates
    swRegistration.update();
    updateCacheSize();
  } catch (error) {
    console.error('❌ Service Worker registration failed:', error);
    updateStatus('Failed', 'offline');
  }
}

// Update SW status display
function updateStatus(status, className) {
  const statusEl = document.getElementById('swStatus');
  statusEl.textContent = status;
  statusEl.className = `status-value ${className}`;
}

function updateState(state) {
  document.getElementById('swState').textContent = state || '-';
}

// Network status monitoring
window.addEventListener('online', () => {
  const networkStatus = document.getElementById('networkStatus');
  networkStatus.textContent = 'Online';
  networkStatus.className = 'status-value online';
  console.log('🌐 Back online');
  syncOfflineQueue();
});

window.addEventListener('offline', () => {
  const networkStatus = document.getElementById('networkStatus');
  networkStatus.textContent = 'Offline';
  networkStatus.className = 'status-value offline';
  console.log('📴 Gone offline');
});

// Update Service Worker
document.getElementById('updateSW').addEventListener('click', async () => {
  if (swRegistration) {
    await swRegistration.update();
    console.log('🔄 Service Worker update triggered');
    alert('Service Worker update triggered. Refresh to see changes.');
  }
});

// Clear cache
document.getElementById('clearCache').addEventListener('click', async () => {
  if (confirm('Clear all cached data?')) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
    console.log('🗑️ Cache cleared');
    updateCacheSize();
    alert('Cache cleared successfully!');
  }
});

// Unregister Service Worker
document.getElementById('unregisterSW').addEventListener('click', async () => {
  if (confirm('Unregister Service Worker?')) {
    if (swRegistration) {
      await swRegistration.unregister();
      console.log('❌ Service Worker unregistered');
      updateStatus('Unregistered', 'offline');
      alert('Service Worker unregistered. Refresh the page.');
    }
  }
});

// API Data Fetcher
document.getElementById('fetchData').addEventListener('click', async () => {
  const url = document.getElementById('apiUrl').value;
  const resultBox = document.getElementById('apiResult');

  if (!url) {
    resultBox.innerHTML = '<p class="placeholder">Please enter a URL</p>';
    return;
  }

  resultBox.innerHTML = '<p>Loading...</p>';

  try {
    const response = await fetch(url);
    const data = await response.json();

    resultBox.innerHTML = `
      <pre>${JSON.stringify(data, null, 2)}</pre>
      <p style="margin-top: 0.5rem; color: #10b981; font-weight: 600;">
        ✓ Loaded from ${navigator.onLine ? 'network' : 'cache'}
      </p>
    `;

    console.log('📦 Data fetched:', data);
  } catch (error) {
    resultBox.innerHTML = `
      <p style="color: #ef4444;">
        ❌ Error: ${error.message}
      </p>
      <p style="margin-top: 0.5rem; color: #666;">
        ${navigator.onLine ? 'Network error' : 'Offline - no cached data available'}
      </p>
    `;
    console.error('❌ Fetch error:', error);
  }
});

// Offline Queue Management
document.getElementById('addToQueue').addEventListener('click', () => {
  const message = document.getElementById('queueMessage').value;

  if (!message) {
    alert('Please enter a message');
    return;
  }

  const item = {
    id: Date.now(),
    message,
    timestamp: new Date().toISOString(),
    status: 'pending'
  };

  offlineQueue.push(item);
  document.getElementById('queueMessage').value = '';
  renderQueue();

  console.log('📤 Added to queue:', item);
});

function renderQueue() {
  const queueList = document.getElementById('queueList');

  if (offlineQueue.length === 0) {
    queueList.innerHTML = '<p class="placeholder">No items in queue</p>';
    return;
  }

  queueList.innerHTML = offlineQueue.map(item => `
    <div class="queue-item">
      <span class="queue-item-text">${item.message}</span>
      <span class="queue-item-status ${item.status}">${item.status}</span>
    </div>
  `).join('');
}

document.getElementById('syncQueue').addEventListener('click', () => {
  syncOfflineQueue();
});

async function syncOfflineQueue() {
  if (!navigator.onLine) {
    alert('Cannot sync while offline');
    return;
  }

  for (const item of offlineQueue) {
    if (item.status === 'pending') {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        item.status = 'synced';
        console.log('✅ Synced:', item);
      } catch (error) {
        console.error('❌ Sync failed:', item, error);
      }
    }
  }

  renderQueue();
  alert('Queue synced successfully!');
}

// Push Notifications
document.getElementById('requestNotification').addEventListener('click', async () => {
  if (!('Notification' in window)) {
    alert('This browser does not support notifications');
    return;
  }

  const permission = await Notification.requestPermission();
  document.getElementById('notificationPermission').textContent = permission;

  if (permission === 'granted') {
    document.getElementById('sendNotification').disabled = false;
    console.log('✅ Notification permission granted');
  }
});

document.getElementById('sendNotification').addEventListener('click', () => {
  if (Notification.permission === 'granted') {
    new Notification('PWA Demo', {
      body: 'This is a test notification from your PWA!',
      icon: './icon-192.png',
      badge: './badge-72.png',
      vibrate: [200, 100, 200],
      tag: 'test-notification'
    });

    console.log('🔔 Notification sent');
  }
});

// Initialize notification permission display
if ('Notification' in window) {
  document.getElementById('notificationPermission').textContent = Notification.permission;
  if (Notification.permission === 'granted') {
    document.getElementById('sendNotification').disabled = false;
  }
}

// Cache Inspector
document.getElementById('inspectCache').addEventListener('click', async () => {
  const cacheList = document.getElementById('cacheList');
  cacheList.innerHTML = '<p>Loading...</p>';

  try {
    const cacheNames = await caches.keys();
    const allCachedUrls = [];

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();

      for (const request of requests) {
        allCachedUrls.push({
          cache: cacheName,
          url: request.url
        });
      }
    }

    if (allCachedUrls.length === 0) {
      cacheList.innerHTML = '<p class="placeholder">No cached items found</p>';
      return;
    }

    cacheList.innerHTML = allCachedUrls.map(item => `
      <div class="cache-item">
        <strong>${item.cache}:</strong><br>
        ${item.url}
      </div>
    `).join('');

    console.log('💾 Cache contents:', allCachedUrls);
  } catch (error) {
    cacheList.innerHTML = `<p style="color: #ef4444;">Error: ${error.message}</p>`;
    console.error('❌ Cache inspection failed:', error);
  }
});

async function updateCacheSize() {
  try {
    const cacheNames = await caches.keys();
    let totalItems = 0;

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      totalItems += requests.length;
    }

    document.getElementById('cacheSize').textContent = `${totalItems} items`;
  } catch (error) {
    console.error('❌ Failed to update cache size:', error);
  }
}

// Install prompt (PWA)
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBanner').style.display = 'block';
  console.log('📱 Install prompt available');
});

document.getElementById('installBtn').addEventListener('click', async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;

  console.log(`📱 Install prompt outcome: ${outcome}`);
  deferredPrompt = null;
  document.getElementById('installBanner').style.display = 'none';
});

document.getElementById('dismissInstall').addEventListener('click', () => {
  document.getElementById('installBanner').style.display = 'none';
  deferredPrompt = null;
});

window.addEventListener('appinstalled', () => {
  console.log('✅ PWA installed successfully');
  document.getElementById('installBanner').style.display = 'none';
});

// Initialize
console.log('✅ PWA Demo initialized');
renderQueue();
