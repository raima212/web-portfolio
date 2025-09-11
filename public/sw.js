const CACHE_NAME = 'melih-ilker-portfolio-v1.0.0'
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add other static assets
]

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Install event')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files')
        return cache.addAll(urlsToCache)
      })
      .catch((error) => {
        console.error('Service Worker: Cache failed', error)
      })
  )
  self.skipWaiting()
})

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate event')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Service Worker: Serving from cache', event.request.url)
          return response
        }

        console.log('Service Worker: Fetching from network', event.request.url)
        return fetch(event.request)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Clone the response
            const responseToCache = response.clone()

            // Add to cache
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache)
              })

            return response
          })
          .catch((error) => {
            console.error('Service Worker: Fetch failed', error)
            
            // Return offline page for navigation requests
            if (event.request.destination === 'document') {
              return caches.match('/index.html')
            }
            
            throw error
          })
      })
  )
})

// Background sync
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag)
  
  if (event.tag === 'contact-form') {
    event.waitUntil(
      // Handle offline form submissions
      handleOfflineFormSubmissions()
    )
  }
})

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received')
  
  const options = {
    body: event.data ? event.data.text() : 'Yeni bir güncelleme mevcut!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Portfolio\'yu İncele',
        icon: '/icons/explore-icon.png'
      },
      {
        action: 'close',
        title: 'Kapat',
        icon: '/icons/close-icon.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Melih Ilker Portfolio', options)
  )
})

// Notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click', event.action)
  
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Message handling
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data)
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Helper functions
async function handleOfflineFormSubmissions() {
  try {
    // Get offline form data from IndexedDB
    const offlineForms = await getOfflineForms()
    
    for (const formData of offlineForms) {
      try {
        // Send form data
        await sendFormData(formData)
        
        // Remove from offline storage
        await removeOfflineForm(formData.id)
      } catch (error) {
        console.error('Failed to send offline form:', error)
      }
    }
  } catch (error) {
    console.error('Error handling offline forms:', error)
  }
}

async function getOfflineForms() {
  // Implementation for getting offline forms from IndexedDB
  return []
}

async function sendFormData(formData) {
  // Implementation for sending form data
  console.log('Sending offline form data:', formData)
}

async function removeOfflineForm(id) {
  // Implementation for removing form from offline storage
  console.log('Removing offline form:', id)
}
