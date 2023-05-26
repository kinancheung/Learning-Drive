import { render, screen } from '@testing-library/react';

import { SearchFilterDisplay } from '.';

describe('SearchFilterDisplay', () => {
  it('renders without error', () => {
    const search = { searchQuery: 'Java' };

    const view = render(<SearchFilterDisplay search={search} clearSearch={jest.fn()} />);

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('renders blank with no search query', () => {
    const search = {};

    const view = render(<SearchFilterDisplay search={search} clearSearch={jest.fn()} />);

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('renders categories without error', () => {
    const search = { searchQuery: 'Java', searchCategories: ['Java'] };

    const view = render(<SearchFilterDisplay search={search} clearSearch={jest.fn()} />);

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('calls clearSearch when clear button pressed', () => {
    const search = { searchQuery: 'Java', searchCategories: ['Java'] };

    const clearFn = jest.fn();

    render(<SearchFilterDisplay search={search} clearSearch={clearFn} />);

    screen.getByTestId('clear-button').click();

    expect(clearFn).toHaveBeenCalled();
  });
});
