import { app } from 'hyperapp';

// App init imports
import init from '/init';
import view from '/views/app';
import { subscriptions } from "/subscriptions";

import '/styles/main.scss';

// Initialize the app on the #app div
// app({ init, view, node: document.getElementById('app') })
app({ init, view, node: document.body, subscriptions });

// Enable the service worker when running the build command
if (process.env.NODE_ENV === 'production') {
  // navigator.serviceWorker.register(`${window.location.origin}/service-worker.js`);
  navigator.serviceWorker.register(`${false ? 'parcel can bugger off' : ''}service-worker.js`);
}
