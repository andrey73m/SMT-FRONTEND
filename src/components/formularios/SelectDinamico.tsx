import { forwardRef } from "react";
import SelectLabel, { SelectLabelProps } from "./SelectLabel";

export interface PropsSelectDinamico extends SelectLabelProps{
  optionLabel: string;
  value: string;

  options: any[];
}

const SelectDinamico = forwardRef<HTMLSelectElement, PropsSelectDinamico>(({ optionLabel, value, options,...props }, ref) => {
  return (
    <SelectLabel ref={ref} {...props}>
      {options && options.map(option =>
        <option key={option[value]} label={option[optionLabel]} value={option[value]}></option>
      )}
    </SelectLabel>
  )
})

SelectDinamico.displayName = "SelectDinamico"

export default SelectDinamico;