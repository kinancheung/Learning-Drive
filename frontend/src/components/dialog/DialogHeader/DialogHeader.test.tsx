import { render, screen } from '@testing-library/react';

import { DialogHeader } from '.';

import { composeTestingWrapper } from '../../../utils/testingUtils';

describe('DialogHeader', () => {
  it('renders without error', () => {
    const view = render(<DialogHeader onClose={jest.fn()} />, {
      wrapper: composeTestingWrapper(),
    });

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('calls handleClose when exit button clicked', () => {
    const onClose = jest.fn();

    render(<DialogHeader onClose={onClose} />, {
      wrapper: composeTestingWrapper(),
    });

    screen.getByTestId('dialog-close-button').click();

    expect(onClose).toHaveBeenCalled();
  });
});
