import { SetA, SetB } from '/actions'
import utils from '/styles/utils.css'

import SvgBack from '/views/svgs/back';
import SvgDayG from '/views/svgs/dayG';
import SvgHamburger from '/views/svgs/hamburger';

// Root application view
export default (state) =>
<div class="nav">
  <div><SvgBack class="back" /></div>
  <div><SvgDayG class="dayG" /></div>
  <div><SvgHamburger class="hamburger" /></div>
</div>
