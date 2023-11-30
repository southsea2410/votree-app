import colors from '../color';
import Button from '@mui/material/Button';

export default function VTButton(props) {
  const { children } = props;
  return <Button>{children}</Button>;
}
