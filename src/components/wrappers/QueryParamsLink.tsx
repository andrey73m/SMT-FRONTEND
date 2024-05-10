import { Link, LinkProps, useLocation } from "react-router-dom";
 
const QueyrParamsLink = ({ to, children, ...props }: LinkProps) => {

  const { search } = useLocation();
  console.log(search)
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}
 
export default QueyrParamsLink;