import { forwardRef } from "react";
import cn from "@/cn";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement>{}

const Select = forwardRef<HTMLSelectElement, Props>(({ className,...props }: Props, ref) => {

  return (
    <select {...props} ref={ref} className={cn("font-medium border-none w-full h-full focus:border-violet-300 p-1 ", className)}>
      {props.children}
    </select>
  )
})

Select.displayName = "Select";

export default Select;