import React, { Component, PropTypes } from 'react';
import {
    View,
} from 'react-native';

// Components
import { Spacer, Text } from '@ui/';
import { Actions } from 'react-native-router-flux';
import AppAPI from '@lib/api';

const FBSDK = require('react-native-fbsdk');

const {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

/* Component ==================================================================== */

class FBLogin extends Component {

  static componentName = 'FBLoginButton';

  constructor(props) {
    super(props);

    this.state = {
      resultMsg: {
        status: '',
        success: '',
        error: '',
      },
    };
  }

  infoRequest = () => {
    return new GraphRequest(
      'me',
      null,
      this._responseInfoCallback,
    )
  }

  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      this.login(result);
    }
  }

  /**
   * Login
   */
  login = (userData) => {
    this.props.login({
      fb_name: userData.name,
      fb_id: userData.id,
    }, true).then(() => {
      this.setState({
        resultMsg: { success: 'Awesome, you\'re now logged in!' },
      }, () => {
        Actions.app({ type: 'reset' });
      });
    }).catch((err) => {
      const error = AppAPI.handleError(err);
      this.setState({ resultMsg: { error } });
    });
  }

  render = () => {
    return (
      <View>
        <LoginButton
          style={{ height: 50, width: 250 }}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                /**
                 * ログインに成功した場合、apiにユーザーデータを送る
                 * ユーザーデータはgraphApiから持ってくる
                 */
                new GraphRequestManager().addRequest(this.infoRequest()).start();
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}
        />
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default FBLogin;
