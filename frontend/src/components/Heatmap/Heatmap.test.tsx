import { render } from '@testing-library/react';

import { Heatmap } from '.';

describe('Heatmap', () => {
  it('should render without error', () => {
    const data = new Array(90).fill(0).map(() => Math.floor(Math.random() * 10));

    const view = render(<Heatmap data={data} />);
    expect(view.asFragment()).toMatchSnapshot();
  });
});
