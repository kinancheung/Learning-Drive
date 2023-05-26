import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, Grow, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { AsyncDialogProps } from 'react-dialog-async';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { DialogHeader } from '../DialogHeader';

import { usersApi } from '../../../api';
import { useIsDesktop } from '../../../hooks/useIsDesktop';
import { followFormFields, followFormSchema } from '../../../utils/schema/followSchema';
import { SubmitButton } from '../../form/SubmitButton';
import TextField from '../../form/TextField';
import SendIcon from '../../icons/SendIcon';

/**
 * Dialog that contains a form to allow users to search the tag name of a user, directing them
 * to their profile.
 */
const FollowDialog = ({ open, handleClose }: AsyncDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();

  const methods = useForm<followFormFields>({
    resolver: yupResolver(followFormSchema),
  });

  const handleSubmit = async ({ userId }: followFormFields) => {
    try {
      let profileId = (await usersApi.getUserIdFromHandle(String(userId))).data;

      navigate(`/profile/${profileId}`);
    } catch (error) {
      enqueueSnackbar('No such user', { variant: 'error' });
    }
  };

  return (
    <Dialog
      PaperProps={{ elevation: 0 }}
      TransitionComponent={Grow}
      open={open}
      onClose={() => handleClose()}
      fullWidth
      fullScreen={!isDesktop}
      maxWidth='sm'
    >
      <DialogHeader onClose={() => handleClose()}>Find User</DialogHeader>
      <DialogContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                required
                name='userId'
                label='User tag'
                size='small'
                autoComplete={'off'}
              />
              <SubmitButton color='primary' variant='contained' size='large' endIcon={<SendIcon />}>
                Find User
              </SubmitButton>
            </Stack>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default FollowDialog;
