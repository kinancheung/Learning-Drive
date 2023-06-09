import { IconButton } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import PageHeader, { PageHeaderProps } from '.';

import SearchIcon from '../../icons/SearchIcon';

export default {
  component: PageHeader,
  title: 'Components/Layout/PageHeader',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    backButton: {
      control: { type: 'boolean' },
    },
  },
} as Meta;

interface PageHeaderStoryProps extends PageHeaderProps {}

const Template: Story<PageHeaderStoryProps> = (args) => (
  <BrowserRouter>
    <PageHeader {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Global Feed',
  backButton: false,
};

export const WithAction = Template.bind({});
WithAction.args = {
  title: 'Global Feed',
  backButton: false,
  action: (
    <IconButton color='secondary'>
      <SearchIcon />
    </IconButton>
  ),
};

export const WithBackButton = Template.bind({});
WithBackButton.args = {
  title: 'Global Feed',
  backButton: true,
};
