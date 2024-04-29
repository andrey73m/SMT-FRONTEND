interface Props extends React.HTMLProps<HTMLParagraphElement>{}

const Enlace = (props: Props) => {
  return(
    <p
      {...props}
      className="hover:underline text-violet-400 hover:text-violet-300 hover:cursor-pointer">{props.children}
    </p>
  )
}

export default Enlace;


