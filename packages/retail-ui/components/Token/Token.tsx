import React from 'react';
import cn from 'classnames';
import styles from './Token.less';
import TokenRemoveIcon from './TokenRemoveIcon';

export interface TokenClassNames {
  token?: string;
  activeToken?: string;
  removeIcon?: string;
}

export interface TokenProps {
  classNames?: TokenClassNames;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onRemove?: React.MouseEventHandler<SVGElement>;
}

const Token: React.SFC<TokenProps> = ({
  children,
  isActive,
  classNames,
  onClick = () => undefined,
  onRemove= () => undefined
}) => {
  const tokenCN = classNames ? classNames.token : undefined;
  const activeTokenCN = classNames ? classNames.activeToken : undefined;
  const removeIconCN = classNames ? classNames.removeIcon : undefined;

  const tokenClassNames = cn(
    styles.token,
    { [activeTokenCN || styles.tokenActive]: isActive },
    tokenCN
  );

  const removeIconClassNames = cn(styles.removeIcon, removeIconCN);
  return (
    <div className={tokenClassNames} onClick={onClick}>
      {children}
      <TokenRemoveIcon className={removeIconClassNames} onClick={onRemove} />
    </div>
  );
};

export default Token;
