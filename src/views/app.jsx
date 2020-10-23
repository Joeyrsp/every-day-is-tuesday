import { SetA, SetB } from '/actions'
import styles from '/styles/main.scss'

import SvgBack from '/views/svgs/back';
import SvgDayG from '/views/svgs/dayG';
import SvgHamburger from '/views/svgs/hamburger';

// Root application view
export default (state) =>
<div class={ styles.nav }>
  <div><SvgBack /></div>
  <div><SvgDayG /></div>
  <div><SvgHamburger /></div>
</div>
