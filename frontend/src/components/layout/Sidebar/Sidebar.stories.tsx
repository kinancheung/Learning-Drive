import { Meta, Story } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { Sidebar } from '.';

export default {
  component: Sidebar,
  title: 'Components/Layout/Sidebar',
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: Story = () => (
  <MemoryRouter>
    <Sidebar />
  </MemoryRouter>
);

export const Default = Template.bind({});
