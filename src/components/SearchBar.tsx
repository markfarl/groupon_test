import { useSearchNav } from "@/contexts/SearchNavContext"
import { CallbackSearchType } from "@/types/SearchResults"

export default function SearchBar({ callback, onTypeCallback }: CallbackSearchType) {
  const { searchNavData, setSearchNavData } = useSearchNav()

  function setSearchAndContext(inputSearch: string): void {
    setSearchNavData({
      ...searchNavData,
      searchTerm: inputSearch
    })
    // If there is callback function, call it, for debounce
    if (onTypeCallback) {
      onTypeCallback(inputSearch)
    }
  }
  return (
    <form className="">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative pr-[55px]">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="search" id="searchTerm"
          value={searchNavData.searchTerm} onChange={(e) => setSearchAndContext(e.target.value)}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..." required />
        <button type="submit" onClick={(e) => {
          e.preventDefault()
          if (searchNavData.searchTerm)
            callback(searchNavData.searchTerm)
        }} className="text-white absolute -right-[0px] h-[54px] w-[54px] bottom-0 bg-search-icon hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="w-6 h-6 text-white dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </button>
      </div>

    </form>
  )
}