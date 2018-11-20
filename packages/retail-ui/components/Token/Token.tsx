import React from 'react';
import cn from 'classnames';
import styles from './Token.less';
import tokenColors from './Colors.less';
import TokenRemoveIcon from './TokenRemoveIcon';

export type TokenColorName = keyof typeof tokenColors;

export interface TokenColors {
  idle: TokenColorName;
  active: TokenColorName;
}

export interface TokenProps {
  colors?: TokenColors;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onRemove?: React.MouseEventHandler<SVGElement>;
}

const Token: React.SFC<TokenProps> = ({
  children,
  isActive,
  colors,
  onClick = () => undefined,
  onRemove = () => undefined
}) => {
  const tokenCN = colors ? tokenColors[colors.idle] : undefined;
  const activeTokenCN = colors ? tokenColors[colors.active] : undefined;

  const tokenClassNames = cn(
    styles.token,
    { [activeTokenCN || styles.tokenActive]: isActive },
    tokenCN
  );

  return (
    <div className={tokenClassNames} onClick={onClick}>
      {children}
      <TokenRemoveIcon className={styles.removeIcon} onClick={onRemove} />
    </div>
  );
};

export default Token;
