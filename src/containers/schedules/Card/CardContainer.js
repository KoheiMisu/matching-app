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
import RecipeCardRender from './CardView';

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
class RecipeCard extends Component {
  static componentName = 'RecipeCard';

  static propTypes = {
    schedule: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.shape({
        rendered: PropTypes.string,
      }),
    }).isRequired,
  }

  constructor(props) {
    super(props);

    const schedule = this.parseRecipeData(props.schedule);
    this.state = {
      schedule,
    };
  }

  componentWillReceiveProps(props) {
    if (props.schedule) {
      const schedule = this.parseRecipeData(props.schedule);
      this.setState({ schedule });
    }
  }

  /**
    * On Press of Card
    */
  onPressCard = () => {
    Actions.scheduleView({
      title: this.props.schedule.title.rendered,
      schedule: this.props.schedule,
    });
  }

  /**
    * When user taps to favourite a schedule
    */
  onPressFavourite = () => {
    const scheduleId = this.props.schedule.id;

    if (scheduleId && this.props.updateFavourites) {
      const favs = (
        this.props.user && this.props.user.acf &&
        this.props.user.acf.favourite_schedules
      )
        ? this.props.user.acf.favourite_schedules
        : null;

      // Build Payload - Update current user favourites
      // Payload should be:
      //   {fields: {favourite_schedules: [{schedule_id: 43}, {schedule_id: 44}]}}
      const arrIdx = this.isFavourite();

      // Remove from current list
      if (arrIdx) favs.splice(arrIdx, 1);
      // Add to current list
      else favs.push({ schedule_id: scheduleId });

      // Send new list to API
      this.props.updateFavourites({ fields: { favourite_schedules: favs } });
    }
  }

  /**
    * Data from API is a bit messy - clean it up here
    */
  parseRecipeData = (data) => {
    const schedule = data;
    const { title } = data;
    const featuredImg = data.better_featured_image;
    title.rendered = AppUtil.htmlEntitiesDecode(title.rendered);

    // Produce a summary
    content.rendered = AppUtil.htmlEntitiesDecode(content.rendered);
    content.rendered = AppUtil.stripTags(content.rendered);
    const summary = AppUtil.limitChars(content.rendered, 60);

    // Is there a better way to test this?
    schedule.featured_image = (
      featuredImg &&
      featuredImg.media_details &&
      featuredImg.media_details.sizes &&
      featuredImg.media_details.sizes.medium &&
      featuredImg.media_details.sizes.medium.source_url
    ) ?
      featuredImg.media_details.sizes.medium.source_url : '';

    return {
      image: schedule.featured_image,
      title: title.rendered,
      content: summary,
    };
  }

  render = () => {
    // const { schedule } = this.state;

    return (
      <RecipeCardRender
        title={schedule.title}
        onPress={this.onPressCard}
      />
    );
  }
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);
