import { Meta, Story } from '@storybook/react';

import FacebookButton from '.';

export default {
  component: FacebookButton,
  title: 'Components/Auth/FacebookButton',
  parameters: { layout: 'centered' },
} as Meta;

const Template: Story = () => <FacebookButton />;

export const Default = Template.bind({});
