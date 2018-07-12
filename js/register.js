
  /**
   *     Service Worker registration
   */
 'use strict';
// Register service worker (src: https://stackoverflow.com/questions/36828088/serviceworkerregistration-active-not-being-set-first-time-chrome)
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
        .then(onRegistration);
}

function onRegistration(registration) {
  if (registration.waiting) {
    console.log('waiting', registration.waiting);
    registration.waiting.addEventListener('statechange', onStateChange('waiting'));
  }

  if (registration.installing) {
    console.log('installing', registration.installing);
    registration.installing.addEventListener('statechange', onStateChange('installing'));
  }

  if (registration.active) {
    console.log('active', registration.active);
    registration.active.addEventListener('statechange', onStateChange('active'));
  }
}

function onStateChange(from) {
  return function(e) {
    console.log('statechange', from, 'to', e.target.state);
  }
}

// Check if service worker is supported in the browser
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log(`Registration successful, scope is ${registration.scope}`);
        }).catch(error => {
            console.log(`Service worker registration failed, error: ${error}`);
        });
}
// Register service worker
navigator.serviceWorker.getRegistrations().then(registrations => {
    for (let registration of registrations) {
        registration.unregister();
    }
})