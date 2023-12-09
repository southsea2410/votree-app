import SvgIcon from "@mui/material/SvgIcon";
import { colors } from "../../styles";

export default function DownvoteIcon(props) {
  const { color, ...otherProps} = props;

  return (
    <SvgIcon {...otherProps} viewBox="0 0 22 20">
      <path d="M14.7126 12.6933L14.7075 12.6983L14.7024 12.7034L8.82612 18.5886L8.47711 18.2429C8.47672 18.2425 8.47633 18.2421 8.47595 18.2417C8.39361 18.1588 8.33979 18.0444 8.33121 17.9239L8.35042 17.7189L9.03888 14.4071C9.29701 13.1653 8.34901 12 7.08074 12L2 12C1.45228 12 1 11.5477 1 11L1 9C1 8.87825 1.02163 8.76522 1.06638 8.64702L4.07921 1.61376L4.07926 1.61378L4.08308 1.60461C4.23116 1.24923 4.58234 0.999998 5 0.999999L14 0.999999C14.5477 0.999999 15 1.45228 15 2L15 12C15 12.2778 14.8908 12.52 14.7126 12.6933ZM19 1L21 1L21 11L19 11L19 1Z" fill={color ? color : colors.primary} stroke={colors.pending} stroke-width="1"  />
    </SvgIcon>
  );
}
