import { tuesdayMachine } from './stateMachine';
import { startApp } from "./app";

window.addEventListener('load', () => {
    /************************************** */
    /* Service worker
    /************************************** */

    // if ('serviceWorker' in navigator) {        
    //     let swPath = `service-worker.js`;
    //     navigator.serviceWorker.register(swPath).then(function (registration) {
    // 		console.log('ServiceWorker registration successful', registration.scope);
    //     }, function (err) {
    //         console.log('ServiceWorker registration failed: ', err);
    //     });   
    // }
});

let app = startApp();
