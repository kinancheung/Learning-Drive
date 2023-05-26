import { Meta, Story } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { Navbar } from '.';

export default {
  component: Navbar,
  title: 'Components/Layout/Navbar',
} as Meta;

const Template: Story = () => (
  <MemoryRouter>
    <Navbar />
  </MemoryRouter>
);

export const Default = Template.bind({});
