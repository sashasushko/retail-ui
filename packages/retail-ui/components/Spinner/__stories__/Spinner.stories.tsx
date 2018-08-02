import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Spinner from '../Spinner';

const reactNodeCaption = (
  <div>
    <Spinner type="mini" caption={null} />{' '}
    <span style={{ color: 'tomato', fontSize: '1.3em' }}>З</span>
    агрузка ...
  </div>
);

storiesOf('Spinner', module)
  .addDecorator(story => (
    <div style={{ height: 150, width: 200, padding: 4 }}>{story()}</div>
  ))
  .add('Simple', () => <Spinner />)
  .add('Big', () => <Spinner type="big" caption="big" />)
  .add('Normal', () => <Spinner type="normal" caption="normal" />)
  .add('Mini', () => <Spinner type="mini" caption="mini" />)
  .add('Mini dimmed', () => (
    <Spinner type="mini" dimmed caption="mini dimmed" />
  ));
