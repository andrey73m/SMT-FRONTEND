import { forwardRef } from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement>{}

const Select = forwardRef<HTMLSelectElement, Props>((props: Props, ref) => {

  return (
    <select {...props} ref={ref} className="bg-violet-950 font-medium border-none w-full h-full focus:border-violet-300 p-1">
      {props.children}
    </select>
  )
})

Select.displayName = "Select";

export default Select;