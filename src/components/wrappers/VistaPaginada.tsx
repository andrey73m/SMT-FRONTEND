import { PaginationQueryType } from "@/models/Paginacion"
import { ReactNode, useCallback, useState } from "react"
import { SpinnerPagina } from "../UI"
import IconoLoop from "../icons/Loop"

interface VistaPaginadaProps<TData>{
  queryPaginacion: PaginationQueryType<TData>
  containerClassName?: string
  endContainerClassName?: string
  scrollButtonClassName?: string
  // eslint-disable-next-line no-unused-vars
  ListElement: (data: TData) => ReactNode
  endMessage?: ReactNode
  scrollButtonIcon: ReactNode

}


const VistaPaginada = <TData,>({
  queryPaginacion: {
    data, isError, isFetchingNextPage, hasNextPage, isLoading, fetchNextPage
  },
  containerClassName,
  ListElement, endContainerClassName, scrollButtonClassName,
  endMessage, scrollButtonIcon }: VistaPaginadaProps<TData>) => {
  const flatData = data?.pages.flatMap(p => p.data)

  const [scrollElement, setScrollElement] = useState<HTMLDivElement>()
  const [canScrollToTop, setCanScrollToTop] = useState(false)

  const fetchRef = useCallback((node: HTMLDivElement) => {
    const observer = new IntersectionObserver(
      entries => {
        
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (node) {
      observer.observe(node);
    }
  }, []);

  const scrollRef = useCallback((node: HTMLDivElement) => {
    if (node){

      const observer = new IntersectionObserver(
        entries => {
  
          if (!entries[0].isIntersecting) {
            setCanScrollToTop(true)
            return
          }
          setCanScrollToTop(false)
        },
        { threshold: 1 }
      );
      observer.observe(node)
      setScrollElement(node)
    }
  }, [])
  const scrollToTop = () => {
    if (scrollElement){
      scrollElement.scrollIntoView({ block: "end" })
    }
  }
  return (
    <>

      <div ref={scrollRef}></div>
      <div className={containerClassName}>
        {flatData?.map(e => ListElement(e))}
        {canScrollToTop && <span onClick={scrollToTop} className={scrollButtonClassName}>{scrollButtonIcon}</span>}
      </div>
      {(isLoading || isFetchingNextPage) && <SpinnerPagina />}
      {!isError && hasNextPage && <div ref = {fetchRef}></div>}
      {isError && !isFetchingNextPage &&
        <div className={endContainerClassName}>
          {hasNextPage && <IconoLoop onClick={() => fetchNextPage()} className="w-7 h-7 text-gray-400 hover:text-gray-500 cursor-pointer hover:animate-spin"/>}
          {endMessage}
        </div>}
    </>
  )
}

export default VistaPaginada