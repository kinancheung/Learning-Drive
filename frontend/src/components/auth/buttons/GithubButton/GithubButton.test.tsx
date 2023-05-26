import { render, screen } from '@testing-library/react';

import GithubButton from '.';

import { composeTestingWrapper } from '../../../../utils/testingUtils';

describe('GithubButton', () => {
  it('renders without error', async () => {
    const view = render(<GithubButton />, {
      wrapper: composeTestingWrapper(),
    });

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('calls the sign in with github function when clicked', async () => {
    const signInWithGithub = jest.fn();

    render(<GithubButton />, {
      wrapper: composeTestingWrapper({ authState: { signInWithGithub } }),
    });

    screen.getByTestId('github-signin-button').click();

    expect(signInWithGithub).toHaveBeenCalled();
  });
});
