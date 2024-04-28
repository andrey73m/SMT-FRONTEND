import { forwardRef, useEffect } from "react";
import SelectDinamico from "./SelectDinamico";
import { useQuery } from "@tanstack/react-query"
import Spinner from "../UI/Spinner";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  queryKey: string
  queryFn: () => Promise<any>
  optionLabel: string;
  label: string;
  value: string;
}

const QuerySelect = forwardRef<HTMLSelectElement, Props>(({ queryFn, queryKey, ...props }: Props, ref) => {

  const query = useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
    refetchOnWindowFocus: false,
    retry: 0
  })
  
  useEffect(() => {
    query.refetch()
  }, [queryFn])

  //TODO:IMPORTANTE > MEJORAR EL ESTILO DE LOS LABELS DE ESTE COMPONENTE
  return (
    <>
      {query.isError && <p>Problema conectando con el servidor</p>}
      <>
        <label>{props.label}</label>
        <div className="flex w-full items-center justify-center">
          {query.isFetching &&
          <div className = "grow">
            <Spinner className="w-7 h-7 mr-2"/>
          </div>
          }
       
          <SelectDinamico ref={ref} {...props} options={query.data} disabled={query.isFetching} />

        </div>
      </>
    </>
  )
})


QuerySelect.displayName = "QuerySelect"

export default QuerySelect;