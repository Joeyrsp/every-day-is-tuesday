import { h, text, app } from 'hyperapp';
import iconBack from "./../icons/back.svg";
import iconDayG from "./../icons/dayG.svg";
import iconHamburger from "./../icons/hamburger.svg";

const view = () => h('div', { class:'nav' }, [
    h('div', {}, [
        h('svg', { class:'back' }, [
            h('use', { href:iconBack+'#import' }),
        ]),
    ]),
    h('div', {}, [
        h('svg', { class:'dayG' }, [
            h('use', { href:iconDayG+'#import' }),
        ]),
    ]),
    h('div', {}, [
        h('svg', { class:'hamburger' }, [
            h('use', { href:iconHamburger+'#import' }),
        ]),
    ]),
]);

export const startApp = () => {
    return app({
        init: true,
        view,
        node: document.querySelector('#app')
    });
}
