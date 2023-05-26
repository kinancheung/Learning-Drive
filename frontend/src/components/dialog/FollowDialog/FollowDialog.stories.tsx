import { Button } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { SnackbarProvider } from 'notistack';
import { DialogProvider, useDialog } from 'react-dialog-async';
import { MemoryRouter } from 'react-router-dom';

import FollowDialog from '.';

export default {
  component: FollowDialog,
  title: 'Components/Dialog/FollowDialog',
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <SnackbarProvider>
        <MemoryRouter>
          <DialogProvider>
            <Story />
          </DialogProvider>
        </MemoryRouter>
      </SnackbarProvider>
    ),
  ],
} as Meta;

const Template: Story = () => {
  const followDialog = useDialog(FollowDialog);

  return (
    <Button color='secondary' variant='contained' onClick={() => followDialog.show()}>
      Show Dialog
    </Button>
  );
};

export const Default = Template.bind({});
