import * as React from "react"
import Svg, { Path, Mask, G } from "react-native-svg"
const FilterIcon = (props) => (
  <Svg
    width={16}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M6.4 11.494H1.15a.625.625 0 0 1 0-1.25H6.4a.625.625 0 0 1 0 1.25M13.992 3.417h-5.25a.625.625 0 0 1 0-1.25h5.25a.625.625 0 0 1 0 1.25"
      clipRule="evenodd"
    />
    <Mask
      id="a"
      width={6}
      height={6}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M.5.167h5.188v5.16H.5V.167Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M3.094 1.417a1.34 1.34 0 0 0-1.344 1.33c0 .734.603 1.33 1.344 1.33.742 0 1.344-.596 1.344-1.33 0-.734-.602-1.33-1.344-1.33m0 3.91A2.59 2.59 0 0 1 .5 2.747 2.591 2.591 0 0 1 3.094.167a2.59 2.59 0 0 1 2.594 2.58 2.59 2.59 0 0 1-2.594 2.58"
        clipRule="evenodd"
      />
    </G>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M12.49 9.507c-.742 0-1.345.596-1.345 1.33 0 .734.603 1.33 1.345 1.33.74 0 1.343-.596 1.343-1.33 0-.734-.602-1.33-1.343-1.33m0 3.91a2.59 2.59 0 0 1-2.595-2.58 2.59 2.59 0 0 1 2.595-2.58 2.59 2.59 0 0 1 2.593 2.58 2.59 2.59 0 0 1-2.593 2.58"
      clipRule="evenodd"
    />
  </Svg>
)
export default FilterIcon;
