import { parseAddress } from './address';

describe('parseAddress', () => {

  it.each`
    input                     |                         expected
    ${undefined}              | ${{ street: '', apartment: '' }}
    ${''}                     | ${{ street: '', apartment: '' }}
    ${'idzikowskiego'}        | ${{ street: 'idzikowskiego', apartment: '' }}
    ${'idzikowskiego 123a'}   | ${{ street: 'idzikowskiego', apartment: '123a' }}
    ${'idzikowskiego  123a'}  | ${{ street: 'idzikowskiego', apartment: '123a' }}
    ${'idzikowskiego 123a b'} | ${{ street: 'idzikowskiego', apartment: '123a b' }}
  `('should handle $input', ({ input, expected }) => {
    const actual = parseAddress(input);

    expect(actual).toEqual(expected);
  });
});