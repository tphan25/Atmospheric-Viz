import "../actions/ProfileActions";
const defaultState = {
  aodVcdCharts: []
};

const aodVcd = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_AOD_VCD":
      return {
        ...state,
        aodVcdCharts: [
          ...state.aodVcdCharts,
          {
            chart: action.chart
          }
        ]
      };
    case "DELETE_AOD_VCD":
      return {
        ...state,
        aodVcdCharts: [
          ...state.aodVcdCharts.slice(0, action.index),
          ...state.aodVcdCharts.slice(action.index + 1)
        ]
      };
    default:
      return state;
  }
};

export default aodVcd;
