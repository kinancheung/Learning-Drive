import { Meta, Story } from '@storybook/react';

import GoogleButton from '.';

export default {
  component: GoogleButton,
  title: 'Components/Auth/GoogleButton',
  parameters: { layout: 'centered' },
} as Meta;

const Template: Story = () => <GoogleButton />;

export const Default = Template.bind({});
