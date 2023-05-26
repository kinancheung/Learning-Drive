import { Meta, Story } from '@storybook/react';

import { StreakIndicator, StreakIndicatorProps } from '.';

export default {
  component: StreakIndicator,
  title: 'Components/Account/StreakIndicator',
  parameters: {
    layout: 'centered',
  },
} as Meta;

interface StreakIndicatorStoryProps extends StreakIndicatorProps {}

const Template: Story<StreakIndicatorStoryProps> = (args) => <StreakIndicator {...args} />;

export const Default = Template.bind({});
Default.args = {
  streak: 5,
};

export const NoStreak = Template.bind({});
NoStreak.args = {
  streak: 0,
};
