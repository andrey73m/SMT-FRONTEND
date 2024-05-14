import { forwardRef } from "react";
import Select from "../UI/Select";
export interface SelectLabelProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}


const SelectLabel = forwardRef<HTMLSelectElement, SelectLabelProps>(({ ...props }, ref) => {

  return (
    <>
      <div className="flex flex-col w-full">

        <label className="pl-2">{props.label}</label>
        <Select {...props} ref={ref}>
          {props.children}
        </Select>
      </div>
    </>
  )
})

SelectLabel.displayName = "SelectLabel";

export default SelectLabel;