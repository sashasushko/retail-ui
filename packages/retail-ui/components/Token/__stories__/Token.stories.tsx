// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Token, { TokenColors } from '../Token';
import Gapped from '../../Gapped/Gapped';

const FixedWidthDecorator = (storyFn: any) => (
  <div
    className="token-test-container"
    style={{ margin: 40, height: 200, width: 400, padding: 4 }}>
    {storyFn()}
  </div>
);

// tslint:disable jsx-no-lambda
storiesOf('Token', module)
  .addDecorator(FixedWidthDecorator)
  .add('default', () => {
    return (
      <>
        <Token>test</Token>
        <Token isActive>test</Token>
      </>
    );
  })
  .add('long text', () => {
    return (
      <>
        <Token>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Token>
        <Token isActive>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Token>
      </>
    );
  })
  .add('colored', () => {
    const gray: TokenColors = {
      idle: 'l-gray',
      active: 'd-gray'
    };

    const blue: TokenColors = {
      idle: 'l-blue',
      active: 'd-blue'
    };

    const violet: TokenColors = {
      idle: 'l-violet',
      active: 'd-violet'
    };

    return (
      <>
        <Gapped vertical={true}>
          <Gapped>
            <Token colors={gray}>test</Token>
            <Token isActive colors={gray}>
              test
            </Token>
          </Gapped>

          <Gapped>
            <Token colors={blue}>test</Token>
            <Token isActive colors={blue}>
              test
            </Token>
          </Gapped>

          <Gapped>
            <Token colors={violet}>test</Token>
            <Token isActive colors={violet}>
              test
            </Token>
          </Gapped>
        </Gapped>
      </>
    );
  });
