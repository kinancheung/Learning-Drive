import { render, screen } from '@testing-library/react';

import FacebookButton from '.';

import { composeTestingWrapper } from '../../../../utils/testingUtils';

describe('FacebookButton', () => {
  it('renders without error', async () => {
    const view = render(<FacebookButton />, {
      wrapper: composeTestingWrapper(),
    });

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('calls the sign in with facebook function when clicked', async () => {
    const signInWithFacebook = jest.fn();

    render(<FacebookButton />, {
      wrapper: composeTestingWrapper({ authState: { signInWithFacebook } }),
    });

    screen.getByTestId('facebook-signin-button').click();

    expect(signInWithFacebook).toHaveBeenCalled();
  });
});
