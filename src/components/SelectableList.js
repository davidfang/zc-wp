/**
 * Created by david_fang on 2016/8/12.
 */
import React, {Component, PropTypes} from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';


var ComposedComponent = MakeSelectable(List);
//let SelectableList = MakeSelectable(List);

class SelectableList extends Component {
    /*static propTypes : {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired
    };*/

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange (event, index)  {
      this.setState({
        selectedIndex: index
      });
      console.log(event,index);
    };

    render() {
      var ComposedComponent = MakeSelectable(List);
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };




export default SelectableList;
