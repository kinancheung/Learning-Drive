import { render } from '@testing-library/react';

import { PostSkeleton } from '.';

describe('PostSkeleton', () => {
  it('renders without error', () => {
    const view = render(<PostSkeleton />);

    expect(view.asFragment()).toMatchSnapshot();
  });
});
