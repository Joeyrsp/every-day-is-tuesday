import { Menu, Scend, ToggleTime, GrabBubble } from '/actions';
import { machineHasAll, mergeProps } from '/utils';

import styles from '/styles/main.scss';

import {
  SvgHamburger,
  SvgScend,
  SvgDayG,
  SvgNightG,
  SvgDayA,
  SvgNightA,
  SvgSight,
  SvgSmell,
  SvgSound,
  SvgTaste,
  SvgTouch
} from "/views/svgs";

// Root application view
export default (state) =>
  <body class={{
    [styles.themeDay]: machineHasAll(state.machine, 'day'),
    [styles.themeNight]: machineHasAll(state.machine, 'night'),
    [styles.themeGrounded]: machineHasAll(state.machine, 'grounded'),
    [styles.themeAscended]: machineHasAll(state.machine, 'ascended'),
  }}>
    <div class={styles.nav}>
      <div>
        <div onclick={Scend}><SvgScend class={styles.iconAscend} /></div>
      </div>
      <div onclick={ToggleTime}>
        <div class={{ [styles.active]: machineHasAll(state.machine, ['day', 'grounded']) }}>
          <SvgDayG class={styles.iconDayG} />
        </div>
        <div class={{ [styles.active]: machineHasAll(state.machine, ['night', 'grounded']) }}>
          <SvgNightG class={styles.iconNightG} />
        </div>
        <div class={{ [styles.active]: machineHasAll(state.machine, ['day', 'ascended']) }}>
          <SvgDayA class={styles.iconDayA} />
        </div>
        <div class={{ [styles.active]: machineHasAll(state.machine, ['night', 'ascended']) }}>
          <SvgNightA class={styles.iconNightA} />
        </div>
      </div>
      <div>
        <div onclick={Menu}><SvgHamburger class={[
          styles.iconHamburger,
          { [styles.arrow]: machineHasAll(state.machine, 'menu') }
        ]} /></div>
      </div>
    </div>

    <div class={styles.bubbles}>
      {Object.entries(state.bubbles).map(([bubbleId, bubble]) => mergeProps({
        id: bubbleId,
        class: {},
        style: {
          transform: `translate(${bubble.x + (window.innerWidth) / 2 - 25}px, ${bubble.y - 25}px)`,
        },
        onclick: GrabBubble,
      },
        bubble.type == 'sight' && <SvgSight class={styles.iconSight} /> ||
        bubble.type == 'smell' && <SvgSmell class={styles.iconSmell} /> ||
        bubble.type == 'sound' && <SvgSound class={styles.iconSound} /> ||
        bubble.type == 'taste' && <SvgTaste class={styles.iconTaste} /> ||
        bubble.type == 'touch' && <SvgTouch class={styles.iconTouch} />
      ))}
    </div>

    {/* {console.log(JSON.stringify(state, null, 2))} */}
  </body>
