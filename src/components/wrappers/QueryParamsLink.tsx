import { Link, LinkProps } from "react-router-dom";
 
const QueyrParamsLink = ({ to, children, ...props }: LinkProps) => {
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}
 
export default QueyrParamsLink;