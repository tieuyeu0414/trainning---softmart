import React from 'react';

import { Icons } from '../themes';
import { SMButton, TextBox } from './ComponentLib';

interface iProps {
  onSearch: (text: string) => void;
  onReload: () => void;
  no_reset?: boolean
}
interface iStates {
  filterValue?: string;
}

export default class TableFilter extends React.Component<iProps, iStates> {
  static index: number;
  static resultCheck: boolean;
  static valueBinding: string;
  static searchValue: string;
  static searchLength: number;

  constructor(props: iProps) {
    super(props);
    this.state = {
      filterValue: '',
    }
  }
  componentDidMount() {
    TableFilter.searchValue = '';
    TableFilter.searchLength = 0;
  }

  //#region event search
  onClientSearch() {
    TableFilter.searchValue = this.state.filterValue?.toLocaleLowerCase().trim() || '';
    TableFilter.searchLength = TableFilter.searchValue.length;
    this.props.onSearch(TableFilter.searchValue);
  }
  onReload() {
    this.props.onReload();
  }
  //#endregion

  //#region  fillter
  public static BindValue(value?: any) {
    this.valueBinding = value?.toString();
    if (this.searchValue && this.valueBinding) {
      this.index = this.valueBinding.toLocaleLowerCase().indexOf(this.searchValue);
      if (this.index >= 0) {
        return <>{this.valueBinding.substring(0, this.index)}<span className="search-focus">{this.valueBinding.substring(this.index, this.index + this.searchLength)}</span>{this.valueBinding.substring(this.index + this.searchLength)}</>;
      } else {
        return this.valueBinding;
      }
    } else {
      return this.valueBinding;
    }
  }
  static CheckFilter(PropertyNames: string[], item: any, sValue: string): boolean {
    this.resultCheck = false;
    for (var PropertyName of PropertyNames) {
      if (item[PropertyName] && item[PropertyName]?.toString()?.toLowerCase()?.includes(sValue) == true) {
        this.resultCheck = true;
        break;
      }
    }
    return this.resultCheck;
  }
  public static ClientSearch<T>(listData: T[], arrFilter: string[], filterValue?: string) {
    if (filterValue) {
      let result = listData!.filter(function (item: T, i) {
        return TableFilter.CheckFilter(arrFilter, item, filterValue);
      })
      return result;
    } else {
      return listData;
    }
  }
  //#endregion

  render() {
    return (
      <table className="search-table " style={{ minWidth: 720 }}>
        <colgroup>
          <col width="6%" />
          <col width="15%" />
          <col width="15%" />
          <col width="20%" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>Nội dung tìm kiếm</th>
            <td>
              <TextBox
                value={this.state.filterValue}
                className="sm-textbox w-100"
                onChange={(e) => {
                  this.setState({ filterValue: e.currentTarget.value });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    this.onClientSearch()
                  }
                }}
                placeholder={'Tìm kiếm'}
              />
            </td>
            <td colSpan={3} style={{ whiteSpace: "nowrap" }}>
              <SMButton className={'sm-button margin-right-5'} onClick={() => this.onClientSearch()}>
                <i className={Icons.search} ></i>  Tìm kiếm
              </SMButton>
              {
                this.props.no_reset === true ? undefined :
                  <SMButton className={'sm-button margin-right-5'} onClick={() => this.onReload()}>
                    <i className={Icons.reset} ></i>  Làm mới
                  </SMButton>
              }

              <SMButton className={'sm-button'} onClick={() => {
                this.setState({ filterValue: '' }, () => this.onClientSearch())
              }}>
                <i className={Icons.close} ></i>  Reset
              </SMButton>
            </td>
          </tr>
        </tbody>
      </table>

    );
  }
}