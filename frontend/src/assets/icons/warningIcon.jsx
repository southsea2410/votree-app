import SvgIcon from "@mui/material/SvgIcon";
import { colors } from "../../styles";

export default function WarningIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        d="M12.5 15.5V16.5H11.5V15.5H12.5ZM12.5 7.5V12.5H11.5V7.5H12.5ZM2.5 12C2.5 6.75549 6.74679 2.5 11.99 2.5C17.2442 2.5 21.5 6.75647 21.5 12C21.5 17.2435 17.2442 21.5 11.99 21.5C6.74679 21.5 2.5 17.2445 2.5 12ZM3.5 12C3.5 16.6961 7.30386 20.5 12 20.5C16.6961 20.5 20.5 16.6961 20.5 12C20.5 7.30386 16.6961 3.5 12 3.5C7.30386 3.5 3.5 7.30386 3.5 12Z"
        fill={colors.primary}
        stroke={colors.green6}
      />
    </SvgIcon>
  );
}
