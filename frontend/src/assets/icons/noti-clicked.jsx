import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import NotiIcon from './notiIcon';
import { colors } from '../../styles';

export default function NotiClicked() {
  return (
      <Avatar variant='icon-clicked'>
        <NotiIcon color={colors.green5} style={{ fontSize: 34 }} />
      </Avatar>
  );
}