import cn from "@/cn";

interface BotonProps extends React.HTMLAttributes<HTMLDivElement> { }

const BotonTopBar = ({ className, children, ...props }: BotonProps) => {
  return (
    <div {...props} className={cn("group relative flex p-0.5 justify-center w-12 items-center hover:bg-purple-950 cursor-pointer", className)}>
      {children}
    </div>
  )
}

export default BotonTopBar;