import { combineReducers } from "redux";
import App from "./app";
import Tabs from "./tab";
import User from "./user";
import Menus from "./menu";
import Routers from "./router";
import Permissions from "./permission";

const Reducers = combineReducers({
  App,
  Tabs,
  User,
  Menus,
  Routers,
  Permissions,
});
export default Reducers;
