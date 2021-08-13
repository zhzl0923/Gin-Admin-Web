import { Link } from "react-router-dom";
import SiteLogo from "@/assets/img/logo.svg";

const Logo = ({ collapsed }) => {
  return (
    <Link
      to="/"
      className="logo"
      style={{ justifyContent: collapsed ? "center" : "space-between" }}
    >
      <img src={SiteLogo} alt="logo" />
      <h1 className="text-white" style={collapsed ? { display: "none" } : {}}>
        {process.env.REACT_APP_SITE_NAME}
      </h1>
    </Link>
  );
};

export default Logo;
