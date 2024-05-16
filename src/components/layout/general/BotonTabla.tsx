import cn from "@/cn";

interface BotonProps extends React.HTMLAttributes<HTMLDivElement> { }

const BotonTabla = ({ className, children, ...props }: BotonProps) => {
  return (
    <div {...props} className={cn("group relative flex p-1 justify-center rounded-lg items-center hover:bg-slate-200 cursor-pointer", className)}>
      {children}
    </div>
  )
}

export default BotonTabla;