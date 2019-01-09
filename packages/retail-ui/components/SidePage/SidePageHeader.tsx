import * as React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import Sticky from '../Sticky';
import { SidePageContext } from './SidePageContext';
import styles from './SidePage.less';
import events from 'add-event-listener';

export interface SidePageHeaderProps {
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
}

export default class SidePageHeader extends React.Component<
  SidePageHeaderProps
> {
  public state = {
    isReadyToFix: false
  };

  private wrapper: HTMLElement | null = null;
  private tmpHeader: HTMLElement | null = null;
  private normalHeaderHeight: number = 0;
  private fixedHeaderHeight: number = 0;
  private fixedCloseOffset: number = 0;

  public componentDidMount() {
    events.addEventListener(window, 'scroll', this.onScroll, true);
    this.calcHeaderHeight();
    this.onScroll();
  }

  public componentWillUnmount() {
    events.removeEventListener(window, 'scroll', this.onScroll, true);
  }

  public componentDidUpdate() {
    this.calcHeaderHeight();
  }

  public render(): JSX.Element {
    const { isReadyToFix } = this.state;
    return (
      <div ref={this.createWrapperRef}>
        {isReadyToFix ? (
          <Sticky side="top">{fixed => this.renderHeader(fixed)}</Sticky>
        ) : (
          this.renderHeader(false)
        )}
        <div className={styles.tmpHeader} ref={this.createTmpHeaderRef} />
      </div>
    );
  }

  private renderHeader(fixed: boolean) {
    const closeOffset = !fixed ? this.fixedCloseOffset : 0;
    return (
      <div className={classNames(styles.header, fixed && styles.fixed)}>
        <Sticky side="top" offset={closeOffset}>
          {this.renderClose()}
        </Sticky>
        <div className={classNames(styles.title, fixed && styles.fixed)}>
          {typeof this.props.children === 'function'
            ? this.props.children(fixed)
            : this.props.children}
        </div>
      </div>
    );
  }

  private renderClose() {
    return (
      <SidePageContext.Consumer>
        {({ requestClose }) => (
          <a href="javascript:" className={styles.close} onClick={requestClose}>
            <span>×</span>
          </a>
        )}
      </SidePageContext.Consumer>
    );
  }

  private onScroll = () => {
    if (!this.wrapper || !this.normalHeaderHeight || !this.fixedHeaderHeight) {
      return;
    }
    const wrapperRect = this.wrapper.getBoundingClientRect();
    const isReadyToFix =
      wrapperRect.top < this.fixedHeaderHeight - this.normalHeaderHeight;
    if (this.state.isReadyToFix !== isReadyToFix) {
      this.setState({
        isReadyToFix
      });
    }
  };

  private calcHeaderHeight = () => {
    if (!this.wrapper || !this.tmpHeader) {
      return;
    }
    this.normalHeaderHeight = this.wrapper.getBoundingClientRect().height;
    ReactDOM.render(this.renderHeader(true), this.tmpHeader, () => {
      if (this.tmpHeader) {
        const tmpHeaderRect = this.tmpHeader.getBoundingClientRect();
        const closeElement = this.tmpHeader.getElementsByClassName(
          styles.close
        )[0];
        if (closeElement) {
          this.fixedCloseOffset =
            closeElement.getBoundingClientRect().top - tmpHeaderRect.top;
        }
        this.fixedHeaderHeight = tmpHeaderRect.height;
        ReactDOM.unmountComponentAtNode(this.tmpHeader);
      }
    });
  };

  private createWrapperRef = (el: HTMLElement | null) => {
    if (el) {
      this.wrapper = el;
    }
  };

  private createTmpHeaderRef = (el: HTMLElement | null) => {
    if (el) {
      this.tmpHeader = el;
    }
  };
}
