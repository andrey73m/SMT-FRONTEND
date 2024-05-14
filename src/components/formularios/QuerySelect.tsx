import { forwardRef, useEffect } from "react";
import SelectDinamico from "./SelectDinamico";
import { useQuery } from "@tanstack/react-query"
import Spinner from "../UI/Spinner";
import { SelectLabelProps } from "./SelectLabel";
import { useFormContext } from "react-hook-form";

interface Props extends SelectLabelProps{
  queryKey: string
  queryFn: () => Promise<any>
  optionLabel: string;
  value: string;
}

const QuerySelect = forwardRef<HTMLSelectElement, Props>(({ queryFn, queryKey, ...props }: Props, ref) => {
  const { setValue } = useFormContext()
  const query = useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
    refetchOnWindowFocus: false,
    retry: 0
  })
  
  useEffect(() => {
    query.refetch()
  }, [queryFn])
  useEffect(() => {
    if (query.isSuccess && props.name) setValue(props.name,props.defaultValue);
  }, [query.data])
  //TODO:IMPORTANTE > MEJORAR EL ESTILO DE LOS LABELS DE ESTE COMPONENTE
  return (
    <>
      {query.isError && <p>Problema conectando con el servidor</p>}
      <>
        
        <div className="flex w-full items-end justify-center">
          {query.isFetching &&
          <div className = "grow">
            <Spinner className="w-7 h-7 mr-2"/>
          </div>
          }
       
          <SelectDinamico ref={ref} {...props}  options={query.data} disabled={query.isFetching} />

        </div>
      </>
    </>
  )
})


QuerySelect.displayName = "QuerySelect"

export default QuerySelect;