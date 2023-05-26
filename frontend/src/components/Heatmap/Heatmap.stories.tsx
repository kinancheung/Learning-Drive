import { Meta, Story } from '@storybook/react';

import { Heatmap, HeatmapProps } from '.';

export default {
  component: Heatmap,
  title: 'Components/Account/Heatmap',
  parameters: {
    layout: 'centered',
  },
} as Meta;

interface HeatmapStoryProps extends HeatmapProps {}

const Template: Story<HeatmapStoryProps> = (args) => <Heatmap {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: new Array(90).fill(0).map(() => Math.floor(Math.random() * 10)),
};
