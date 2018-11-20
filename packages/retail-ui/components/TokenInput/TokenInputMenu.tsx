import * as React from 'react';
import Popup from '../Popup/Popup';
import ComboBoxMenu, {
  ComboBoxMenuProps
} from '../CustomComboBox/ComboBoxMenu';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem/MenuItem';
import MenuSeparator from '../MenuSeparator/MenuSeparator';

export interface TokenInputMenuProps extends ComboBoxMenuProps<string> {
  anchorElement: HTMLElement;
  inputValue: string;
  showAddItemHint?: boolean;
  onAddItem: (item: string) => void;
}

export default class TokenInputMenu extends React.Component<
  TokenInputMenuProps
> {
  private menu: Menu | null = null;

  public render() {
    const {
      loading,
      maxMenuHeight,
      renderTotalCount,
      totalCount,
      opened,
      items,
      renderNotFound,
      renderItem,
      onChange
    } = this.props;

    return (
      <Popup
        opened={opened!}
        positions={['bottom left']}
        anchorElement={this.props.anchorElement}
        margin={8}
        popupOffset={8}>
        <ComboBoxMenu
          items={items}
          loading={loading}
          maxMenuHeight={maxMenuHeight}
          onChange={onChange}
          opened={opened}
          refMenu={this.menuRef}
          renderTotalCount={renderTotalCount}
          renderItem={renderItem}
          renderNotFound={renderNotFound}
          totalCount={totalCount}
          renderAddButton={this.renderAddButton}
        />
      </Popup>
    );
  }

  public getMenuRef = (): any | null => this.menu;
  private menuRef = (node: any) => (this.menu = node);

  private renderAddButton = (
    value = this.props.inputValue
  ): React.ReactNode | undefined => {
    if (!this.props.showAddItemHint) {
      return;
    }

    const handleAddItemNoteClick = () => this.props.onAddItem(value);

    const addItemNote = (
      <MenuItem
        onClick={handleAddItemNoteClick}
        comment="Нажмите Enter или запятую">
        Добавить {value}
      </MenuItem>
    );

    return [<MenuSeparator key="separator" />, addItemNote];
  };
}
