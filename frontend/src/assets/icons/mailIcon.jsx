import SvgIcon from '@mui/material/SvgIcon';
import { colors } from '../../styles';

export default function MailIcon(props) {
    const { color, ...otherProps } = props;

    return (
        <SvgIcon {...otherProps} viewBox="0 0 22 16">
            <path
                d="M18.8301 0H2.83008C1.73008 0 0.840078 0.9 0.840078 2L0.830078 14C0.830078 15.1 1.73008 16 2.83008 16H18.8301C19.9301 16 20.8301 15.1 20.8301 14V2C20.8301 0.9 19.9301 0 18.8301 0ZM18.8301 14H2.83008V4L10.8301 9L18.8301 4V14ZM10.8301 7L2.83008 2H18.8301L10.8301 7Z"
                fill={color}
            />
        </SvgIcon>
    );
}
