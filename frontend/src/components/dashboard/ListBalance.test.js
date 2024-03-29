import '@testing-library/jest-dom';
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ListBalance from './ListBalance';
import '@testing-library/jest-dom';

test('renders balance without crashing', () => {
  const { getByTestId, getByAltText } = render(
    <ListBalance
      cls='positive'
      name='Kelly'
      amount={123}
      csymbol='$'
      imgSrc='https://www.google.com/url?sa=i&url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FHTML%2FElement%2Fimg&psig=AOvVaw2iFeMaA0WFPJJfef6CAheY&ust=1616279868669000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiegu21ve8CFQAAAAAdAAAAABAN'
      txt='owes you'
    />
  );
  expect(getByTestId('listbalance')).toHaveTextContent('Kelly owes you$ 123');
  expect(getByAltText('Avatar'));
});
