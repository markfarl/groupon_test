import { searchNavDataType } from "@/types/SearchResults"

export default function navigateSearch(searchProps: searchNavDataType) {
  return `/search/${searchProps.searchTerm}/${searchProps.limit}`
}