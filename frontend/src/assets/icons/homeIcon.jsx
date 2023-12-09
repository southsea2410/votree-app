import SvgIcon from "@mui/material/SvgIcon";
import { colors } from "../../styles";

export default function HomeIcon(props) {
  const { color, ...otherProps} = props;

  return (
    <SvgIcon {...otherProps} viewBox="0.5 -1 17 20">
      <path d="M7.04132 16.9192V11.5155H10.9543V16.9192C10.9543 17.5137 11.3945 18 11.9326 18H14.8673C15.4054 18 15.8456 17.5137 15.8456 16.9192V9.35395H17.5086C17.9586 9.35395 18.1738 8.73792 17.8315 8.41369L9.65326 0.275593C9.28152 -0.0918643 8.71413 -0.0918643 8.3424 0.275593L0.164202 8.41369C-0.168404 8.73792 0.0370287 9.35395 0.487025 9.35395H2.15006V16.9192C2.15006 17.5137 2.59027 18 3.12831 18H6.06307C6.60111 18 7.04132 17.5137 7.04132 16.9192Z" stroke={colors.green5} stroke-width="2" fill={color}/>
    </SvgIcon>
  );
}
