import { CursorSetupData, PageFetchFunc, PaginationOptions, PaginationResponse, ChangeSortFunc } from "@/models/Paginacion"
import { InfiniteData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react";

const useQueryPaginacion = <TData, TCursorSetup extends readonly string[]>
  (queryKey: string,functionPaginacion: PageFetchFunc<TData, TCursorSetup>, couldBeInfinite: boolean = true) => {

  const [cursorsetup, setCursorSetup] = useState<CursorSetupData<TCursorSetup>>();
  const [hasEnded, setHasEnded] = useState(false)

  const queryPaginacion = useInfiniteQuery<
      PaginationResponse<TData>,
      Error,
      InfiniteData<PaginationResponse<TData>>,
      any,
      PaginationOptions<TCursorSetup>>
      ({
        queryKey: [queryKey],
        queryFn: async ({ pageParam }) => {
          const res = await functionPaginacion(pageParam)
          if (!res.data.length || !res.nextPageCursor) {
            if (!couldBeInfinite) setHasEnded(true)
            console.log("FINAL")
            throw new Error("There's no more data, at the moment")
          }
          return res
        },
        getNextPageParam: (lastPage) => {
          if (couldBeInfinite && hasEnded) {
            
            return
          }
          return { cursor: lastPage.nextPageCursor }
        },
        initialPageParam: { cursorsetup },
        refetchOnWindowFocus: false
      })
      
  const queryClient = useQueryClient()
  
  useEffect(() => {
    queryClient.resetQueries({ queryKey: [queryKey], exact: true })
    console.log(`Invalidada?: ${queryKey}`)
  },[cursorsetup])
  
  const changeSort: ChangeSortFunc<TCursorSetup>  = (newSort) => {
    setCursorSetup(newSort);
    setHasEnded(false)
    
  };
  return { queryPaginacion, changeSort }
}

export default useQueryPaginacion;