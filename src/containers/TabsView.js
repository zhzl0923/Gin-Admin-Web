import { connect } from "react-redux";
import Tabs from "@/components/Tabs";
import {
  addTab,
  removeTab,
  removeOthersTab,
  removeAllTab,
} from "@/redux/actions/tab";

const mapStateToProps = (state) => {
  return {
    tabs: state.Tabs,
    routes: state.Routers,
  };
};

const mapDispatchToProps = (dispatch) => {
  const callback = {
    addTab: (tab) => {
      dispatch(addTab(tab));
    },
    removeTab: (tabkey) => {
      dispatch(removeTab(tabkey));
    },
    removeOthersTab: (tabkey) => {
      dispatch(removeOthersTab(tabkey));
    },
    removeAllTab: () => {
      dispatch(removeAllTab());
    },
  };
  return {
    callback: callback,
  };
};

const TabsView = connect(mapStateToProps, mapDispatchToProps)(Tabs);
export default TabsView;
