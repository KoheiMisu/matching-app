/**
 * Recipe Tabs Container
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { connect } from 'react-redux';

// Actions
import * as ScheduleActions from '@redux/schedules/actions';

// The component we're mapping to
import RecipeTabsRender from './BrowseView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  schedules: state.schedule.schedules,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getSchedules: ScheduleActions.getSchedules,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeTabsRender);
