/**
 * Recipe Reducer
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import AppUtil from '@lib/util';

// Set initial state
const initialState = {
  schedules: [],
};

export default function scheduleReducer(state = initialState, action) {
  switch (action.type) {
    case 'SCHEDULES_REPLACE': {
      let schedules = [];
  
      // Pick out the items to keep
      if (action.data && typeof action.data === 'object') {
        schedules = action.data.map(item => ({
          scheduleId: item.scheduleId,
          categoryName: AppUtil.htmlEntitiesDecode(item.categoryName),
          location: AppUtil.htmlEntitiesDecode(item.location),
          memo: AppUtil.htmlEntitiesDecode(item.memo),
          scope: AppUtil.htmlEntitiesDecode(item.scope),
          startTime: item.startTime,
          endTime: item.endTime,
        }));
      }
  
      return {
        ...state,
        schedules,
      };
    }
    default:
      return state;
  }
}
