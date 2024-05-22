import React from "react";
import { useFormContext } from "react-hook-form";
import EstrellasFeedBack from "../UI/EstrellasFeedBack";

interface EstrellasFeedBackFormProps extends React.InputHTMLAttributes<HTMLInputElement>{
  max: number;
}
 
const EstrellasFeedBackForm  = ({ max = 5, className, ...props }: EstrellasFeedBackFormProps) => {
  const { setValue, watch } = useFormContext()
  
  const onChange = (nueva: number) => {
    if (props.name)
      setValue(props.name, nueva)
  }

  let calificacion
  if (props.name) calificacion = watch(props.name)

  
  return (
    <EstrellasFeedBack cantidad={max} valor={calificacion} className={className} onChange={onChange}/>

  );
}
 
export default EstrellasFeedBackForm;