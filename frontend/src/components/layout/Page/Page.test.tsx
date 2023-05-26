import { render } from '@testing-library/react';

import { Page } from '.';

import { composeTestingWrapper } from '../../../utils/testingUtils';

describe('Page', () => {
  it('renders without error', () => {
    const view = render(<Page title='Global Feed' />, { wrapper: composeTestingWrapper() });

    expect(view.asFragment()).toMatchSnapshot();
  });
});
