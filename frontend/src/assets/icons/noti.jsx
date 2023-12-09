import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import NotiIcon from './notiIcon';
import { colors } from '../../styles';

export default function Noti() {
  return (
      <Avatar variant='icon' viewBox="0 0 0 0">
        <NotiIcon color={colors.green2} style={{ fontSize: 34 }} />
      </Avatar>
  );
}