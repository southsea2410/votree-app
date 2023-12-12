import SvgIcon from "@mui/material/SvgIcon";
import { colors } from "../../styles";

export default function LeafIcon(props) {
  const { color, ...otherProps } = props;

  return (
    <SvgIcon {...otherProps} viewBox="0 0 46 51">
      <path
        d="M13.615 38.3285C40.19 38.3285 42.3303 15.7186 42.4997 4.97589C42.5193 3.7483 41.4916 2.75811 40.264 2.78065C2.5 3.47423 2.5 21.7822 2.5 38.3285V47.2205"
        stroke={color}
        strokeWidth="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        d="M2.5 38.3286C2.5 38.3286 2.5 24.9906 20.2841 22.7676"
        stroke={color}
        strokeWidth="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </SvgIcon>
  );
}
