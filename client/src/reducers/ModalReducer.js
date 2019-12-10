const defaultState = {
  modalOpen: false
};

const modal = (state = defaultState, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        modalOpen: true,
        modalChart: action.chart
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modalOpen: false
      };
    default:
      return state;
  }
};
export default modal;
