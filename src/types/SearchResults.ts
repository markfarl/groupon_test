import { SetStateAction } from "react"

export interface searchNavDataType {
  searchTerm: string,
  limit: number,
  history: string[],
}

export type SearchNaVProviderType = {
  searchNavData: searchNavDataType,
  setSearchNavData: React.Dispatch<SetStateAction<searchNavDataType>>
}

export type CallbackSearchType = {
  callback: (arg0: string) => void,
  onTypeCallback?: (arg0: string) => void
}

interface SearchResults {
	title: string,
	href: string,
}

export type ReturnSearchResults = {
	limit: number,
	total: number,
	term?: string,
	results?: SearchResults[]
}

export type GetSearchResults = {
	term: string,
	limit: number,
}