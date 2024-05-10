import { Link, LinkProps, useLocation } from "react-router-dom";
 
const RedirectionURILink = ({ to, children, ...props }: LinkProps) => {
  const { pathname } = useLocation();
  console.log(pathname)
  return (
    <Link to={to + `?redireccion=${pathname}`} {...props}>
      {children}
    </Link>
  );
}
 
export default RedirectionURILink;