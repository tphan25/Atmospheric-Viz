import { combineReducers } from "redux";
import profiles from "./ProfileReducer";
import aodVcd from "./AodVcdReducer";
import modal from "./ModalReducer";

export default combineReducers({
  profiles,
  aodVcd,
  modal
});
