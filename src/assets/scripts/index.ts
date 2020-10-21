import { tuesdayMachine } from "./stateMachine";

window.addEventListener('load', function () {
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

    /************************************** */
    /* Cookie message options
    /************************************** */

    // window.cookieconsent.initialise({
    //     'palette': {
    //         'popup': {
    //         'background': '#000000'
    //         },
    //         'button': {
    //         'background': '#0000ff'
    //         }
    //     },
    //     'position': 'top',
    //     'static': true,
    //     'theme': 'classic',
    //     'content': {
    //         'href': ''
    //     }
    // })
});

let water: HTMLCanvasElement = document.querySelector('.water')

water.width = window.innerWidth;
water.height = window.innerHeight;

let ctx = water.getContext('2d');

ctx.fillStyle = 'white';
ctx.strokeStyle = 'black';

let total = 0

let timePrev = 0;

const frame = (time) => {
    let delta = time - timePrev;

    let widthOld = window.innerWidth;
    let heightOld = window.innerHeight;
    if (widthOld != water.width || heightOld != water.height) {
        water.width = window.innerWidth;
        water.height = window.innerHeight;
        ctx.fillStyle = 'white';
    }

    ctx.fillRect(0, 0, water.width, water.height);

    ctx.beginPath();
    ctx.moveTo(total, 0);
    ctx.lineTo(total, water.height);
    ctx.stroke();

    total = (total + delta) % water.width;

    timePrev = time;
    window.requestAnimationFrame(frame);
}

window.requestAnimationFrame(frame);
