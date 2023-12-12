import SvgIcon from '@mui/material/SvgIcon';
import { colors } from '../../styles';

export default function ImageIcon(props) {
    const { color, ...otherProps } = props;

    return (
        <SvgIcon {...otherProps}>
            <path
                d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
                fill={color}
            />
        </SvgIcon>
    );
}
