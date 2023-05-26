import { Button } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { SnackbarProvider } from 'notistack';
import { DialogProvider, useDialog } from 'react-dialog-async';

import SearchPostsDialog, { SearchPostsDialogProps } from '.';

export default {
  component: SearchPostsDialog,
  title: 'Components/Dialog/SearchPostsDialog',
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <SnackbarProvider>
        <DialogProvider>
          <Story />
        </DialogProvider>
      </SnackbarProvider>
    ),
  ],
} as Meta;

interface SearchPostsDialogStoryProps extends SearchPostsDialogProps {}

const Template: Story<SearchPostsDialogStoryProps> = (args) => {
  const searchPostsDialog = useDialog(SearchPostsDialog);

  return (
    <Button color='secondary' variant='contained' onClick={() => searchPostsDialog.show(args)}>
      Show Dialog
    </Button>
  );
};

export const Default = Template.bind({});
