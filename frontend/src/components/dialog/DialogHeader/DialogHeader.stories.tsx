import { Card } from '@mui/material';
import { Meta, Story } from '@storybook/react';

import { DialogHeader, DialogHeaderProps } from '.';

export default {
  component: DialogHeader,
  title: 'Components/Dialog/DialogHeader',
  parameters: {
    layout: 'centered',
  },
} as Meta;

interface DialogHeaderStoryProps extends DialogHeaderProps {}

const Template: Story<DialogHeaderStoryProps> = () => (
  <Card sx={{ position: 'relative', width: 300 }}>
    <DialogHeader onClose={() => {}}>Header</DialogHeader>
  </Card>
);

export const Default = Template.bind({});
