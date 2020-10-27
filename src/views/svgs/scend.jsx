import { mergeClasses } from "/utils";

export default (props) => mergeClasses(props,
<svg class="primary" viewBox="0 0 30 30" fill="#E22323" stroke="#E22323" stroke-width="4">
  <defs>
    <clipPath id="innerfy">
      <circle r="15" />
    </clipPath>
  </defs>
  <circle transform="translate(15 15)" r="15" clip-path="url(#innerfy)" />
</svg>
)
