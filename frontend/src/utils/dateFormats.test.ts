import { format } from 'date-fns';

import { dateFormats } from './dateFormats';

describe('dateFormats', () => {
  it('renders the "post" date format correctly', () => {
    const date = new Date('2022-05-10T06:32:14.373Z');

    expect(format(date, dateFormats.post)).toMatchInlineSnapshot(`"6:32 PM 10/05/2022"`);
  });
});
