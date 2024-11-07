import { Link, LinkProps, useLocation } from "react-router-dom";
 
const RedirectionURILink = ({ to, children, ...props }: LinkProps) => {
  const { pathname } = useLocation();
  let url = to.toString();
  if (url.includes("?")) url += "&"
  else url += "?"
  return (
    <Link to={url + `redireccion=${pathname}`} {...props}>
      {children}
    </Link>
  );
}
 
export default RedirectionURILink;