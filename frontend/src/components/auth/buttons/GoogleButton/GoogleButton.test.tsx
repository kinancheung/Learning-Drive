import { render, screen } from '@testing-library/react';

import GoogleButton from '.';

import { composeTestingWrapper } from '../../../../utils/testingUtils';

describe('GoogleButton', () => {
  it('renders without error', async () => {
    const view = render(<GoogleButton />, {
      wrapper: composeTestingWrapper(),
    });

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('calls the sign in with google function when clicked', async () => {
    const signInWithGoogle = jest.fn();

    render(<GoogleButton />, {
      wrapper: composeTestingWrapper({ authState: { signInWithGoogle } }),
    });

    screen.getByTestId('google-signin-button').click();

    expect(signInWithGoogle).toHaveBeenCalled();
  });
});
