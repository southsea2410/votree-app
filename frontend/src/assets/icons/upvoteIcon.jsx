import SvgIcon from "@mui/material/SvgIcon";
import { colors } from "../../styles";

export default function UpvoteIcon(props) {
  const { color, ...otherProps } = props;

  return (
    <SvgIcon {...otherProps} viewBox="0 0 22 21">
      <path d="M7.28736 7.30673L7.29254 7.30168L7.29764 7.29657L13.1739 1.4114L13.5229 1.75711C13.5233 1.75749 13.5237 1.75788 13.5241 1.75827C13.6064 1.84117 13.6602 1.95559 13.6688 2.07612L13.6496 2.2811L12.9611 5.59295C12.703 6.83467 13.651 8 14.9193 8H20C20.5477 8 21 8.45228 21 9V11C21 11.1217 20.9784 11.2348 20.9336 11.353L17.9208 18.3862L17.9207 18.3862L17.9169 18.3954C17.7688 18.7508 17.4177 19 17 19H8C7.45228 19 7 18.5477 7 18V8C7 7.7222 7.10924 7.48003 7.28736 7.30673ZM3 19H1V9H3V19Z" fill={color ? color : colors.primary} stroke={colors.success} stroke-width="1" />
    </SvgIcon>
  );
}
