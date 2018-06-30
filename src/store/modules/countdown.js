import actionCreator from '../actionCreator';


export const START_COUNTDOWN = 'START_COUNTDOWN';
export const startCountdown = actionCreator(START_COUNTDOWN);
export const STOP_COUNTDOWN = 'STOP_COUNTDOWN';
export const stopCountdown = actionCreator(STOP_COUNTDOWN);
export const START_TIME_CHANGE = 'START_TIME_CHANGE';
export const setStartTime = actionCreator(START_TIME_CHANGE);
export const END_TIME_CHANGE = 'END_TIME_CHANGE';
export const setEndTime = actionCreator(END_TIME_CHANGE);
export const TIME_COUNTER_CHANGE = 'TIME_COUNTER_CHANGE';
export const setCounter = actionCreator(TIME_COUNTER_CHANGE);



const actionHandlers = {
  [START_COUNTDOWN]: (state, payload) => ({
    ...state,
    countdownId: payload,
    timeDiff: state.endTime.diff(state.startTime),
    timeExpired: false,
  }),

  [STOP_COUNTDOWN]: (state, payload) => {
    clearInterval(state.countdownId);
    return {
      ...state,
      countdownId: 0,
      counter: state.startTime.clone(),
      timeDiff: state.endTime.diff(state.startTime),
      timeExpired: false,
    };
  },

  [START_TIME_CHANGE]: (state, payload) => ({
    ...state,
    startTime: payload,
    counter: payload.clone(),
  }),

  [END_TIME_CHANGE]: (state, payload) => ({
    ...state,
    endTime: payload,
  }),

  [TIME_COUNTER_CHANGE]: (state, payload) => ({
    ...state,
    ...payload,
  }),
};

const initialState = {
  countdownId: 0,
  startTime: null,
  endTime: null,
  counter: null,
  timeDiff: null,
  timeExpired: true,
};

export default function countdownReducer(state = initialState, { type, payload }) {
  return actionHandlers.hasOwnProperty(type)
    ? actionHandlers[type](state, payload)
    : state;
}
