interface Props extends React.PropsWithChildren{}

const ErrorFormulario = (props: Props) => {
  return(
    <div className="text-purple-300">
      <p>{props.children}</p>
    </div>
  )
}

export default ErrorFormulario;