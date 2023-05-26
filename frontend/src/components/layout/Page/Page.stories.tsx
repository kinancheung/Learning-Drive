import { Meta, Story } from '@storybook/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import { Page, PageProps } from '.';

export default {
  component: Page,
  title: 'Components/Layout/Page',
  argTypes: {
    backButton: {
      control: { type: 'boolean' },
    },
  },
} as Meta;

interface PageStoryProps extends PageProps {}

const Template: Story<PageStoryProps> = (args) => (
  <HelmetProvider>
    <MemoryRouter>
      <Page {...args} />
    </MemoryRouter>
  </HelmetProvider>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Global feed',
  backButton: false,
};
