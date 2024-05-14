import cn from "@/cn";

interface IconoFlechaProps extends React.SVGAttributes<HTMLOrSVGElement> {}
 
const IconoFlecha = ({ className }: IconoFlechaProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={cn("h-full", className)}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
}
 
export default IconoFlecha;