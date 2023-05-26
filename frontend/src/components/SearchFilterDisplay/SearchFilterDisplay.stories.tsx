import { Meta, Story } from '@storybook/react';

import { SearchFilterDisplay, SearchFilterDisplayProps } from '.';

export default {
  component: SearchFilterDisplay,
  title: 'Components/Feed/SearchFilterDisplay',
  parameters: {
    layout: 'centered',
  },
} as Meta;

interface SearchFilterDisplayStoryProps extends SearchFilterDisplayProps {}

const Template: Story<SearchFilterDisplayStoryProps> = (args) => <SearchFilterDisplay {...args} />;

export const Default = Template.bind({});
Default.args = {
  search: { searchQuery: 'Java' },
  clearSearch: () => {},
};

export const WithCategories = Template.bind({});
WithCategories.args = {
  search: { searchQuery: 'Java', searchCategories: ['Java', 'TypeScript'] },
  clearSearch: () => {},
};
