/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';

import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AccountBalance from 'material-ui/svg-icons/action/account-balance';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Receipt from 'material-ui/svg-icons/action/receipt';
import LiveHelp from 'material-ui/svg-icons/communication/live-help';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleActive = this.handleActive.bind(this);
  }

  /**
   * 跳转tab
   * @param tab
   */
  handleActive(tab) {
    this.context.router.push(tab.props['data-route']);
  }

  render() {
    const style = {
      man:{marginBottom:'72px'},
      tabs: {
        position: 'fixed',
        width:'96%',
        bottom: 0
      }
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="梅 花 盘"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <div style={style.man} >
            {this.props.children}
          </div>
          <Tabs style={style.tabs}>
            <Tab
              icon={<AccountBalance />}
              label="行情"
              data-route="/"
              onActive={this.handleActive}
            />
            <Tab
              icon={<AccountBox />}
              label="账户"
              data-route="/ucenter"
              onActive={this.handleActive}
            />
            <Tab
              icon={<Receipt />}
              label="数据"
              data-route="/news"
              onActive={this.handleActive}
            />
            <Tab
              icon={<LiveHelp />}
              label="帮助"
              data-route="/help"
              onActive={this.handleActive}
            />
          </Tabs>
        </div>
      </MuiThemeProvider>
    );
  }
}
Main.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default Main;
