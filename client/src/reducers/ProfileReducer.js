import "../actions/ProfileActions";

const defaultState = {
  profileCharts: []
};

const profiles = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_PROFILE":
      return {
        ...state,
        profileCharts: [
          ...state.profileCharts,
          {
            chart: action.chart
          }
        ]
      };
    case "DELETE_PROFILE":
      return {
        ...state,
        profileCharts: [
          ...state.profileCharts.slice(0, action.index),
          ...state.profileCharts.slice(action.index + 1)
        ]
      };
    default:
      return state;
  }
};

export default profiles;
