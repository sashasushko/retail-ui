// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Token from '../Token';
import styles from './styles.less';
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
    const yellowStyle = {
      token: styles.yellow_token,
      activeToken: styles.yellow_activeToken,
      removeIcon: styles.removeIcon
    };

    const violetStyle = {
      token: styles.violet_token,
      activeToken: styles.violet_activeToken,
      removeIcon: styles.removeIcon
    };

    return (
      <>
        <Gapped vertical={true}>
          <Token classNames={yellowStyle}>test</Token>
          <Token isActive classNames={yellowStyle}>
            test
          </Token>
          <Token classNames={violetStyle}>test</Token>
          <Token isActive classNames={violetStyle}>
            test
          </Token>
        </Gapped>
      </>
    );
  });
