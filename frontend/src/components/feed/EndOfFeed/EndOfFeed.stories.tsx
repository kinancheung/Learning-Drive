import { Meta, Story } from '@storybook/react';

import { EndOfFeed, EndOfFeedProps } from '.';

export default {
  component: EndOfFeed,
  title: 'Components/Feed/EndOfFeed',
} as Meta;

interface EndOfFeedStoryProps extends EndOfFeedProps {}

const Template: Story<EndOfFeedStoryProps> = (args) => <EndOfFeed {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'This message can be customised',
};
