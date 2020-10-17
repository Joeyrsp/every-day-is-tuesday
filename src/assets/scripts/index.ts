window.addEventListener('load', function () {    
	/************************************** */
	/* Service worker
	/************************************** */

    // if ('serviceWorker' in navigator) {        
    //     let swPath = `service-worker.js`;
    //     navigator.serviceWorker.register(swPath).then(function (registration) {
	// 		// console.log('ServiceWorker registration successful', registration.scope);
    //     }, function (err) {
    //         console.log('ServiceWorker registration failed: ', err);
    //     });   
    // }
    
    /************************************** */
	/* Cookie message options
	/************************************** */

    // window.cookieconsent.initialise({
    //     "palette": {
    //         "popup": {
    //         "background": "#000000"
    //         },
    //         "button": {
    //         "background": "#0000ff"
    //         }
    //     },
    //     "position": "top",
    //     "static": true,
    //     "theme": "classic",
    //     "content": {
    //         "href": ""
    //     }
    // })
});    

let water: HTMLCanvasElement = document.querySelector(".water")

water.width = window.innerWidth;
water.height = window.innerHeight;

let ctx = water.getContext("2d");

ctx.fillStyle = "red";
ctx.strokeStyle = "black";

ctx.fillRect(0, 0, water.width, water.height);
