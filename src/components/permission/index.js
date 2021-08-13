import store from "@/redux";

const Permission = ({ permission, children }) => {
  const { Permissions } = store.getState();
  return Permissions.includes(permission) ? children : <></>;
};

export default Permission;
