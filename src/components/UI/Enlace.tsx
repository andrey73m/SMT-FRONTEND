import TextoClickable, { TextoClickableProps } from "./TextoClickable";


const Enlace = (props: TextoClickableProps) => {
  return(
    <TextoClickable
      {...props}
      className="text-violet-400 hover:text-violet-300">{props.children}
    </TextoClickable>
  )
}

export default Enlace;


