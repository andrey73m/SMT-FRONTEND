import Boton, { BotonProps } from "./Boton";



const BotonNegativo = ({ className, ...props }: BotonProps) => {
  return (
    <Boton {...props} className={`bg-rose-700 hover:bg-rose-800 ${className}`} />
  );
}

export default BotonNegativo;