/* eslint-disable no-unused-vars */
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query"

export type TDirectionOrdering = -1 | 0 | 1

type TOrderBy<T extends readonly string[]> = {
    name: T[number]
    direction: TDirectionOrdering
}

export type CursorSetupData<T extends readonly string[]> = {
  orderby?: TOrderBy<T>[]
  pageSize?: number
}

export type PaginationOptions<T extends readonly string[]> = {cursorsetup?: CursorSetupData<T>, cursor?: never} | {cursorsetup?: never, cursor?: string}


export interface PaginationResponse<T> {
  data: T[]
  nextPageCursor?: string
}

export type ChangeSortFunc<TCursorSetup extends readonly string[]> = (newSort: CursorSetupData<TCursorSetup>) => void
export type PageFetchFunc<TData, TCursorSetup extends readonly string[]> = (nextParam: PaginationOptions<TCursorSetup>) => Promise<PaginationResponse<TData>>

export type PaginationQueryType<TData> = UseInfiniteQueryResult<InfiniteData<PaginationResponse<TData>, unknown>, Error>