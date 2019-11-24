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
    default:
      return state;
  }
};

export default profiles;
