import { combineReducers } from "redux";
import profiles from "./ProfileReducer";
import aodVcd from "./AodVcdReducer";

export default combineReducers({
  profiles,
  aodVcd
});
