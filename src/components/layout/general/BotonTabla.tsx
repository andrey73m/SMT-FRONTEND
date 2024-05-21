import cn from "@/cn";

export interface BotonTablaProps extends React.HTMLAttributes<HTMLDivElement> { }

const BotonTabla = ({ className, children, ...props }: BotonTablaProps) => {
  return (
    <div {...props} className={cn("group relative flex p-1 justify-center rounded-lg items-center hover:bg-slate-200 cursor-pointer h-full", className)}>
      {children}
    </div>
  )
}

export default BotonTabla;