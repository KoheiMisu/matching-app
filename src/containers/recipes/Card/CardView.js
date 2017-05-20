/**
 * Recipe View Screen
 *  - The individual recipe screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Badge from 'react-native-smart-badge';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Card, Text, Spacer } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  favourite: {
    position: 'absolute',
    top: -45,
    right: 0,
  },
});

/* Component ==================================================================== */
class ScheduleCard extends Component {
  static componentName = 'ScheduleCard';

  // static propTypes = {
  //   schedule: PropTypes.object
  // }
  
  render = () => {
    
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <Card>
          <View style={[AppStyles.paddingBottomSml]}>
            <Text h3>{this.props.schedule.startTime}</Text>
            <Badge minWidth={25} minHeight={25} textStyle={{ color: '#fff', fontSize: 15 }} style={{ backgroundColor: '#43A047' }}>
              {this.props.schedule.categoryName}
            </Badge>
  
            <Spacer size={5} />
             
            <Text h4>場所</Text>
            <Text p>{this.props.schedule.location}</Text>
            <Text h4>メモ</Text>
            <Text p>{this.props.schedule.memo}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

/* Export Component ==================================================================== */
export default ScheduleCard;
