import { Meta, Story } from '@storybook/react';

import GithubButton from '.';

export default {
  component: GithubButton,
  title: 'Components/Auth/GithubButton',
  parameters: { layout: 'centered' },
} as Meta;

const Template: Story = () => <GithubButton />;

export const Default = Template.bind({});
