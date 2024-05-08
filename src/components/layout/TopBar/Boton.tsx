import cn from "../../../cn";

interface BotonProps extends React.HTMLAttributes<HTMLDivElement> { }

const BotonTopBar = ({ className, children, ...props }: BotonProps) => {
  return (
    <div {...props} className={cn("group relative flex p-0.5 justify-center items-center hover:bg-purple-950 ", className)}>
      {children}
    </div>
  )
}

export default BotonTopBar;