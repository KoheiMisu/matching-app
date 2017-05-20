/**
 * Recipe Actions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import AppAPI from '@lib/api';

export function getSchedules() {
  return (dispatch) => {
    return AppAPI.schedules.get()
    .then((res) => {
      dispatch({
        type: 'SCHEDULES_REPLACE',
        data: res,
      });
    });
  };
}
