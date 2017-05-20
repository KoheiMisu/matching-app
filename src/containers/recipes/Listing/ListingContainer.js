/**
 * List of Recipes for a Meal Container
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
// import * as UserActions from '@redux/user/actions';

// Consts and Libs
import AppAPI from '@lib/api';
import { ErrorMessages } from '@constants/';

// Components
import Error from '@components/general/Error';
import Loading from '@components/general/Loading';
import RecipeListingRender from './ListingView';

/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = () => ({
});

// Any actions to map to the component?
const mapDispatchToProps = {
};

/* Component ==================================================================== */
class ScheduleListing extends Component {
  static componentName = 'ScheduleListing';

  static propTypes = {
    schedules: PropTypes.arrayOf(PropTypes.object),
  }

  constructor(props) {
    super(props);
  
    this.state = {
      loading: false,
      error: null,
      schedules: props.schedules,
    };
  }

  componentDidMount = () => {
    // this.fetchRecipes();
  }

  render = () => {
    const { loading, error, schedules } = this.state;

    if (loading) return <Loading />;
    if (error) return <Error text={error} />;

    return (
      <RecipeListingRender
        schedules={schedules}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleListing);
