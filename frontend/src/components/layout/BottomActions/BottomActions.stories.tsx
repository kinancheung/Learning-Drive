import { Box, Fab } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { BottomActions } from '.';

import PlusIcon from '../../icons/PlusIcon';

export default {
  component: BottomActions,
  title: 'Components/Layout/BottomActions',
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: Story = () => (
  <MemoryRouter>
    <BottomActions>
      <Box sx={{ flexGrow: 1 }} />
      <Fab color='primary'>
        <PlusIcon />
      </Fab>
    </BottomActions>
  </MemoryRouter>
);

export const Default = Template.bind({});
