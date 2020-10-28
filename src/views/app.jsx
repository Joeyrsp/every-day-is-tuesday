import { Menu, Scend, GenRitual, GrabBubble } from '/actions';
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
  SvgTouch,
  SvgCustom,
  SvgActivity,
  SvgEmbody,
  SvgScene,
  SvgWater
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
      <div onclick={GenRitual}>
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
      {Object.entries(state.bubbles).map(([id, bubble]) => mergeProps({
        id,
        key: id,
        class: {
          [styles.picked]: Object.values(state.bubbleSlots).includes(id),
        },
        style: {
          transform: `translate(${bubble.x + (window.innerWidth - bubble.size) / 2}px, ${bubble.y - bubble.size / 2}px)`,
        },
        onclick: GrabBubble,
      },
        bubble.type == 'sight' && <SvgSight class={styles.iconSight} /> ||
        bubble.type == 'smell' && <SvgSmell class={styles.iconSmell} /> ||
        bubble.type == 'sound' && <SvgSound class={styles.iconSound} /> ||
        bubble.type == 'taste' && <SvgTaste class={styles.iconTaste} /> ||
        bubble.type == 'touch' && <SvgTouch class={styles.iconTouch} /> ||
        bubble.type == 'custom' && <SvgCustom class={styles.iconCustom} /> ||
        bubble.type == 'activity' && <SvgActivity class={styles.iconActivity} /> ||
        bubble.type == 'embody' && <SvgEmbody class={styles.iconEmbody} /> ||
        bubble.type == 'scene' && <SvgScene class={styles.iconScene} />
      ))}
      {state.message && <div class={styles.message} >
        <div>
          {state.message}
        </div>
      </div>}
    </div>

    <SvgWater class={styles.water} />

    {/* {console.log(JSON.stringify(state, null, 2))} */}
  </body>
