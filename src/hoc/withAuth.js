import { useAuth } from "../customHooks";
import { withRouter } from "../withRouter";

const WithAuth = (props) => useAuth(props) && props.children;

export default WithAuth;
