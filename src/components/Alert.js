import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Slide } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

export default function AlertComponent(props) {
  const { message, type, variant } = props;
  const [AlertOpen, setAlertOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };
  return (
    <Snackbar anchorOrigin={{
      vertical: ' bottom',
      horizontal: 'left'
    }}
      open={AlertOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      variant={variant}
      TransitionComponent={TransitionLeft}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>

    </Snackbar >
  );
}