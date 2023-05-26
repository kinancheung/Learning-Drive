import { render } from '@testing-library/react';

import { Loading } from '.';

describe('Loading', () => {
  it('renders without error', () => {
    const view = render(<Loading />);

    expect(view.asFragment()).toMatchSnapshot();
  });
});
