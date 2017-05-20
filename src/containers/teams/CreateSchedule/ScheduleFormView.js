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

import {
  FormLabel,
  FormInput,
  CheckBox
} from 'react-native-elements';

import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Card, Text, Spacer, Button } from '@ui/';

// moment.js
const moment = require('moment');

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  favourite: {
    position: 'absolute',
    top: -45,
    right: 0,
  },
  datePicker: {
    width: 200,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 10
  }
});

/* Component ==================================================================== */
class ScheduleFormView extends Component {
  static componentName = 'ScheduleFormView';
  
  // static propTypes = {
  //   schedule: PropTypes.object
  // }
  
  constructor(props){
    super(props);
    
    // @Todo datetimeの初期化
    
    this.state = {
      startTime: moment().format('YYYY-MM-DD HH:00'),
      endTime: moment().format('YYYY-MM-DD HH:00'),
      checked: true
    };
  }
  
  submit = () => {
    console.log(this.state);
  }
  
  render = () => {
  
    return (
      <View activeOpacity={0.8}>
  
        <Text>メモ</Text>
        <DatePicker
          style={ styles.datePicker }
          date={this.state.startTime}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          minuteInterval={30}
          onDateChange={
            (selectedStartTime) => {
              this.setState({
                startTime: selectedStartTime,
                endTime: selectedStartTime
              });
            }
          }
        />
        
        <TouchableOpacity>
          <DatePicker
            style={ styles.datePicker }
            date={this.state.endTime}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            minuteInterval={30}
            onDateChange={
              (selectedEndTime) => {
                this.setState({
                  endTime: selectedEndTime
                });
              }
            }
          />
        </TouchableOpacity>
  
        <ModalDropdown
          defaultValue='Select Category'
          options={['練習', '飲み会']}
          animated={false}
          style={{
            margin: 5,
            marginLeft: 10,
            marginRight: 10,
            padding: 10,
          }}
          textStyle={{ fontSize: 15, }}
        />
  
        <FormLabel>場所</FormLabel>
        <FormInput />
  
        <FormLabel>MEMO</FormLabel>
        <FormInput />
  
        <CheckBox
          title='公開'
          checked={this.state.checked}
          containerStyle={{ backgroundColor: '#E9EBEE' }}
        />
  
        <Button
          title={'Submit !'}
          onPress={this.submit}
        />
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default ScheduleFormView;
