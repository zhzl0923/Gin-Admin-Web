import * as Icons from "@ant-design/icons";

import AntIcon from "@ant-design/icons";

const Icon = ({ type }) => {
  return <AntIcon component={Icons[type]} />;
};

export default Icon;
