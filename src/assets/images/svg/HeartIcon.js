import * as React from "react"
import Svg, { Mask, Path, G } from "react-native-svg"
const SvgComponent = ({props, width , height , fill , stroke}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
    fill={fill}
    {...props}
  >
    <Mask
      id="a"
      width={21}
      height={21}
      x={0}
      y={-1}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill={fill}
        fillRule="evenodd"
        d="M.5 0h20.473v19.5H.5V0Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={fill}
        fillRule="evenodd"
        d="M2.324 9.123c1.402 4.362 6.94 7.889 8.413 8.762 1.477-.882 7.056-4.448 8.413-8.758.89-2.786.064-6.315-3.222-7.374-1.592-.511-3.45-.2-4.731.792a.75.75 0 0 1-.91.006 5.234 5.234 0 0 0-4.75-.798c-3.28 1.058-4.104 4.587-3.213 7.37Zm8.414 10.378a.748.748 0 0 1-.36-.091c-.312-.171-7.685-4.235-9.482-9.829L.895 9.58C-.233 6.058 1.023 1.632 5.078.325a6.729 6.729 0 0 1 5.657.714C12.36.011 14.52-.273 16.387.325c4.059 1.309 5.319 5.734 4.192 9.255-1.74 5.53-9.166 9.655-9.481 9.828a.743.743 0 0 1-.36.093Z"
        clipRule="evenodd"
      />
    </G>
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M16.654 7.625a.75.75 0 0 1-.747-.69 2.024 2.024 0 0 0-1.4-1.768.75.75 0 0 1 .46-1.428 3.525 3.525 0 0 1 2.436 3.075.75.75 0 0 1-.75.81Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
