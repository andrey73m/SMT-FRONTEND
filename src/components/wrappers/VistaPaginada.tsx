import { PaginationQueryType } from "@/models/Paginacion"
import { ReactNode } from "react"
import { SpinnerPagina } from "../UI"
import IconoLoop from "../icons/Loop"
import { BotonSecundario } from "../UI/Botones"

interface VistaPaginadaProps<TData>{
  queryPaginacion: PaginationQueryType<TData>
  containerClassName?: string
  // eslint-disable-next-line no-unused-vars
  ListElement: (data: TData) => ReactNode
  endMessage?: ReactNode
}


const VistaPaginada = <TData,>({
  queryPaginacion: {
    data, isSuccess, isError, isFetchingNextPage, hasNextPage, isLoading, fetchNextPage
  },
  containerClassName,
  ListElement,
  endMessage }: VistaPaginadaProps<TData>) => {

  const flatData = data?.pages.flatMap(p => p.data)

  return (
    <>
      <div className={containerClassName}>
        {flatData?.map(e => ListElement(e))}
      </div>
      {(isLoading || isFetchingNextPage) && <SpinnerPagina />}
      {hasNextPage && <BotonSecundario onClick={() => fetchNextPage()}>Cargar Mas</BotonSecundario>}
      {isError &&
      <div className="mx-auto w-1/2">
        {hasNextPage && <IconoLoop className="w-12 h-12"/>}
        {endMessage}
      </div>}
    </>
  )
}

export default VistaPaginada