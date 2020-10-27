import cc from 'classcat';
import { Menu, Scend, ToggleTime } from '/actions';
import { machineHasAll } from '/utils';

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
        <div onclick={Menu}><SvgHamburger class={cc([
          styles.iconHamburger,
          { [styles.arrow]: machineHasAll(state.machine, 'menu') }
        ])} /></div>
      </div>
    </div>


    {console.log(JSON.stringify(state, null, 2))}
  </body>
