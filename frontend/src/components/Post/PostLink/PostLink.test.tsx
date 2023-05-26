import { render } from '@testing-library/react';

import { PostLink } from '.';

describe('PostLink', () => {
  it('renders without error', () => {
    const view = render(<PostLink url='https://www.google.com' />);

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('renders title correctly', () => {
    const view = render(<PostLink url='https://www.google.com' title='Google' />);

    expect(view.asFragment()).toMatchSnapshot();
  });
});
