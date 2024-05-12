import { Skeleton } from '@mui/material';
import React from 'react';

export default function LoadingScreen() {
  return (
    <>
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </>
  );
}
