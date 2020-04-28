import createDataContext from './createDataContext';

const pacmanReducer = (state, action) => {
  switch (action.type) {
    case 'set_left':
      return {
        ...state,
        position: {
          ...state.position,
          left: action.payload,
        },
      };
    case 'set_top':
      return {
        ...state,
        position: {
          ...state.position,
          top: action.payload,
        },
      };
    case 'set_hunt_mode':
      return {
        ...state,
        huntMode: action.payload,
      };
    case 'reset':
      return { ...state, position: { left: 0, right: 0 } };
    default:
      return state;
  }
};

const setLeft = dispatch => left =>
  dispatch({ type: 'set_left', payload: left });

const setTop = dispatch => top => dispatch({ type: 'set_top', payload: top });

const setHuntMode = dispatch => huntMode =>
  dispatch({ type: 'set_hunt_mode', payload: huntMode });

const reset = dispatch => () => {
  dispatch({ type: 'reset' });
};

export const { Context, Provider } = createDataContext(
  pacmanReducer,
  { setLeft, setTop, setHuntMode, reset },
  { position: { left: 0, right: 0 }, huntMode: false },
);
