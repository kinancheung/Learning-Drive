import { render, screen } from '@testing-library/react';

import { EndOfFeed } from '.';

describe('EndOfFeed', () => {
  it('renders without error', () => {
    const view = render(<EndOfFeed />);

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('renders the message given', () => {
    const message = 'This is going to be shown in the component';

    render(<EndOfFeed message={message} />);

    const textDisplay = screen.getByTestId('end-of-feed-message');

    expect(textDisplay).toHaveTextContent(message);
  });
});
