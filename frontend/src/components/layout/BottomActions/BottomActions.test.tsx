import { render } from '@testing-library/react';

import { BottomActions } from '.';

describe('BottomActions', () => {
  it('renders without error', () => {
    const view = render(<BottomActions />);

    expect(view.asFragment()).toMatchSnapshot();
  });
});
