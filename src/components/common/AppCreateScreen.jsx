import { Box, Container, Grid, Paper } from '@mui/material';
import AlertDialog from 'src/components/common/AlertDialog';
import { useDialog } from 'src/hooks/use-dialog';
import { useNavigate } from 'react-router-dom';
import { useSettingsContext } from 'src/components/settings';
import { Formik } from 'formik';
import AppCreateHeader from './AppCreateHeader';

export default function AppCreateScreen({
  title,
  initialValues,
  validationSchema,
  children,
  childForm = null,
  hasCondition = false,
  conditionMessage = null,
  enableReinitialize = true,
  otherValues = null,
  controller,
  id,
}) {
  const navigate = useNavigate();
  const dialog = useDialog();
  const settings = useSettingsContext();
  const onSubmit = async (values, resetForm) => {
    debugger;
    if (hasCondition) {
      toast.error(conditionMessage);
      return;
    }
    if (id) {
      if (otherValues) {
        let newValues = { ...values, ...otherValues };
        console.log('newValues', newValues);
        //   await onPost({
        //     controller: controller,
        //     values: newValues,
        //     resetForm: resetForm,
        //     id: id,
        //     title: title,
        //     navigate: navigate,
        //   });
      } else {
        let newValues = { ...values };
        console.log('newValues', newValues);
        //   await onPost({
        //     controller: controller,
        //     values: newValues,
        //     resetForm: resetForm,
        //     id: id,
        //     title: title,
        //     navigate: navigate,
        //   });
      }
    } else {
      if (otherValues) {
        let newValues = { ...values, ...otherValues };
        console.log('newValues', newValues);
        //   await onPost({
        //     controller: controller,
        //     values: newValues,
        //     resetForm: resetForm,
        //     title: title,
        //     navigate: navigate,
        //   });
      } else {
        let newValues = { ...values };
        console.log('newValues', newValues);
        //   await onPost({
        //     controller: controller,
        //     values: newValues,
        //     resetForm: resetForm,
        //     title: title,
        //     navigate: navigate,
        //   });
      }
    }
  };

  const handleReset = (resetForm, values, setFieldValue) => {
    const codevalue = values?.code;
    resetForm();
    setFieldValue('code', codevalue);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <AlertDialog
        title="Alert"
        text="Do you want to close"
        open={dialog.open}
        handleOnClose={dialog.handleClose}
        handleOnApply={() => {
          dialog.handleClose();
          navigate(-1);
        }}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Formik
          validationSchema={validationSchema}
          enableReinitialize={enableReinitialize}
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
        >
          {({ handleSubmit, isSubmitting, resetForm, values, setFieldValue }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              <Grid container justifyContent="space-between">
                <AppCreateHeader
                  title={title}
                  handleOpen={dialog.handleOpen}
                  isSubmitting={isSubmitting}
                  handleSubmit={handleSubmit}
                  handleReset={() => handleReset(resetForm, values, setFieldValue)}
                  id={id}
                />
              </Grid>
              <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
                <Grid container spacing={4}>
                  {typeof children === 'function' ? children(values, setFieldValue) : children}
                </Grid>
              </Paper>
            </form>
          )}
        </Formik>
        {childForm}
      </Box>
    </Container>
  );
}
