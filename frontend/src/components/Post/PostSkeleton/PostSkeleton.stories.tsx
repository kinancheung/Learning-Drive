import { Container } from '@mui/material';
import { Meta, Story } from '@storybook/react';

import { PostSkeleton } from '.';

export default {
  component: PostSkeleton,
  title: 'Components/Post/PostSkeleton',
  parameters: { layout: 'centered' },
} as Meta;

const Template: Story = () => (
  <Container maxWidth='md'>
    <PostSkeleton />
  </Container>
);

export const Default = Template.bind({});
