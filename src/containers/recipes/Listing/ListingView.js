/**
 * Recipe Listing Screen
 *  - Shows a list of receipes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  ListView,
  RefreshControl,
} from 'react-native';

// Consts and Libs
import { AppColors, AppStyles } from '@theme/';
import { ErrorMessages } from '@constants/';

// Containers
import ScheduleCard from '@containers/recipes/Card/CardContainer';

// Components
import Error from '@components/general/Error';

/* Component ==================================================================== */
class ScheduleListing extends Component {
  static componentName = 'ScheduleListing';

  static propTypes = {
    schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
    // reFetch: PropTypes.func,
  }

  constructor(props) {
    super(props);
  
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  
    this.state = {
      isRefreshing: true,
      dataSource: ds.cloneWithRows(props.schedules)
    };
  }
  
  /**
   * @see componentWillReceiveProps http://qiita.com/koba04/items/66e9c5be8f2e31f28461
   *
   * @param props
   */
  // componentWillReceiveProps(props) {
  //   this.setState({
  //     dataSource: this.state.dataSource.cloneWithRows(props.schedules),
  //     isRefreshing: false,
  //   });
  // }

  /**
    * Refetch Data (Pull to Refresh)
    */
  // reFetch = () => {
  //   if (this.props.reFetch) {
  //     this.setState({ isRefreshing: true });
  //
  //     this.props.reFetch()
  //       .then(() => {
  //         this.setState({ isRefreshing: false });
  //       });
  //   }
  // }

  render = () => {
    const { schedules } = this.props;
    const { isRefreshing, dataSource } = this.state;

    if (!isRefreshing && (!schedules || schedules.length < 1)) {
      return <Error text={ErrorMessages.recipe404} />;
    }
  
  
    // console.log(dataSource);
    // console.log(schedules);

    return (
      <View style={[AppStyles.container]}>
        <ListView
          initialListSize={8}
          renderRow={schedule => <ScheduleCard schedule={schedule} />}
          dataSource={dataSource}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default ScheduleListing;
