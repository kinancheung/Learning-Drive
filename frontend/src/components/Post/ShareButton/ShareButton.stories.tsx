import { Meta, Story } from '@storybook/react';
import { SnackbarProvider } from 'notistack';

import { ShareButton, ShareButtonProps } from '.';

export default {
  component: ShareButton,
  title: 'Components/Post/ShareButton',
  parameters: { layout: 'centered' },
} as Meta;

interface ShareButtonStoryProps extends ShareButtonProps {}

const Template: Story<ShareButtonStoryProps> = () => (
  <SnackbarProvider>
    <ShareButton postId={1} />
  </SnackbarProvider>
);

export const Default = Template.bind({});
