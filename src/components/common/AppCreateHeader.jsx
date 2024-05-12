import { ButtonGroup, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Save03Icon from '@untitled-ui/icons-react/build/esm/Save01';
import Reset0ICon from '@untitled-ui/icons-react/build/esm/RefreshCcw01';
import CancelIcon from '@untitled-ui/icons-react/build/esm/X';

import { LoadingButton } from '@mui/lab';

export default function AppCreateHeader({
  handleReset,
  isSubmitting,
  handleSubmit,
  handleOpen,
  id,
}) {
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Typography variant="h4">Add </Typography>
      </Grid>
      <Grid item>
        <ButtonGroup variant="contained" color="primary">
          <LoadingButton
            startIcon={<CancelIcon />}
            color="inherit"
            onClick={handleOpen}
            size="large"
            variant="contained"
            loadingPosition="start"
            loading={isSubmitting}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            startIcon={<Reset0ICon />}
            disabled={!!id}
            size="large"
            color="warning"
            onClick={handleReset}
            variant="contained"
            loadingPosition="start"
            loading={isSubmitting}
          >
            Clear
          </LoadingButton>
          <LoadingButton
            startIcon={<Save03Icon />}
            onClick={handleSubmit}
            size="large"
            variant="contained"
            loadingPosition="start"
            loading={isSubmitting}
            type="submit"
          >
            Save
          </LoadingButton>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
