import { render } from '@testing-library/react';

import { ShareButton } from '.';

import { composeTestingWrapper } from '../../../utils/testingUtils';

describe('ShareButton', () => {
  it('renders without error', () => {
    const view = render(<ShareButton postId={1} />, { wrapper: composeTestingWrapper() });

    expect(view.asFragment()).toMatchSnapshot();
  });
});
