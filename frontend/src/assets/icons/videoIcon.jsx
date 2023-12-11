import SvgIcon from "@mui/material/SvgIcon";
import { colors } from "../../styles";

export default function VideoIcon(props) {
  const { color, ...otherProps } = props;

  return (
    <SvgIcon {...otherProps}>
      <path
        d="M10 8V16L15 12L10 8ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
        fill={color}
      />
    </SvgIcon>
  );
}
