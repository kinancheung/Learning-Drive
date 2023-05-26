import { render } from '@testing-library/react';

import { HeartButton } from '.';

import { composeTestingWrapper } from '../../../utils/testingUtils';

describe('HeartButton', () => {
  it('renders without error', () => {
    const view = render(<HeartButton />, { wrapper: composeTestingWrapper() });

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('renders filled without error', () => {
    const view = render(<HeartButton filled />, { wrapper: composeTestingWrapper() });

    expect(view.asFragment()).toMatchSnapshot();
  });
});
