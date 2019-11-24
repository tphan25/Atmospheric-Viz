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
    default:
      return state;
  }
};

export default aodVcd;
