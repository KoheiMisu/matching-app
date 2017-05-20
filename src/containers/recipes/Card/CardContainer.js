/**
 * Individual Recipe Card Container
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

// Actions
import * as UserActions from '@redux/user/actions';

// Consts and Libs
import AppUtil from '@lib/util';

// Components
import ScheduleCardRender from './CardView';

/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  user: state.user,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  updateFavourites: UserActions.updateMe,
};

/* Component ==================================================================== */
class ScheduleCard extends Component {
  
  static componentName = 'ScheduleCard';

  // static propTypes = {
  //   schedule: PropTypes.shape({
  //     scheduleId: PropTypes.number,
  //     title: PropTypes.string,
  //   }).isRequired,
  // }

  constructor(props) {
    super(props);
  
    const schedule = this.parseScheduleData(props.schedule);
    this.state = {
      schedule,
    };
  }

  componentWillReceiveProps(props) {
    if (props.schedule) {
      const schedule = this.parseScheduleData(props.schedule);
      this.setState({ schedule });
    }
  }

  /**
    * On Press of Card
    */
  // onPressCard = () => {
  //   Actions.scheduleView({
  //     title: this.props.schedule.title.rendered,
  //     recipe: this.props.schedule,
  //   });
  // }

  /**
    * Data from API is a bit messy - clean it up here
    */
  parseScheduleData = (data) => {
    
    const { startTime, endTime, location, categoryName, memo } = data;
    
    // Produce a summary
    // memo.rendered = AppUtil.stripTags(memo);
    const summary = AppUtil.limitChars(memo, 60);

    return {
      startTime: startTime,
      endTime: endTime,
      categoryName: categoryName,
      memo: summary,
      location: location,
    };
  }

  render = () => {
    const { schedule } = this.state;
    
    console.log(schedule);

    return (
      <ScheduleCardRender
        schedule={schedule}
      />
    );
  }
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleCard);
