import { searchNavDataType, SearchNaVProviderType } from "@/types/SearchResults"
import { createContext, useContext, useState } from "react"

const searchNavDefaults: searchNavDataType  = {
  searchTerm: "",
  limit: 20,
  history: []
}
const SearchNavContext = createContext<SearchNaVProviderType>({
  setSearchNavData: function (): void {
    throw new Error("Function not implemented.")
  },
  searchNavData: searchNavDefaults
})
const useSearchNav = () => useContext(SearchNavContext);

function SearchNavProvider({ children }: { children: JSX.Element }) {
  const [searchNavData, setSearchNavData] = useState(searchNavDefaults)

  return (
    <SearchNavContext.Provider value={{ searchNavData, setSearchNavData }}>
      {children}
    </SearchNavContext.Provider>
  )
}

export { SearchNavProvider, useSearchNav }