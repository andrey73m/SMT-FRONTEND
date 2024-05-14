import { forwardRef } from "react";
import cn from "@/cn";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement>{}

const Select = forwardRef<HTMLSelectElement, Props>(({ className,...props }: Props, ref) => {
  
  return (
    <select {...props} ref={ref} defaultValue={props.defaultValue} className={cn("font-medium w-full h-full focus:outline-none border-b-2 border-violet-500 p-1 ", className)}>
      {props.children}
    </select>
  )
})

Select.displayName = "Select";

export default Select;