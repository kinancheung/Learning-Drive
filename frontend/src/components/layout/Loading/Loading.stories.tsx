import { Meta, Story } from '@storybook/react';

import { Loading } from '.';

export default {
  component: Loading,
  title: 'Components/Loading',
} as Meta;

const Template: Story = () => <Loading />;

export const Default = Template.bind({});
