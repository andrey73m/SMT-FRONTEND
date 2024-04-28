import { forwardRef } from "react";
import Select from "../UI/Select";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement>{
  optionLabel: string;
  value: string;

  options: any[];
}

const SelectDinamico = forwardRef<HTMLSelectElement, Props>(({ optionLabel, value, options,...props }: Props, ref) => {
  return (
    <Select ref={ref} {...props}>
      {options && options.map(option =>
        <option key={option[value]} label={option[optionLabel]} value={option[value]}></option>
      )}
    </Select>
  )
})

SelectDinamico.displayName = "SelectDinamico"

export default SelectDinamico;
export type { Props as PropsSelectDinamico }