import logoDark from "@/assets/logo-dark.png"
import DarkMode from "@/components/DarkMode"
import SearchBar from "@/components/SearchBar"
import { useSearchNav } from "@/contexts/SearchNavContext"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ReturnSearchResults, searchNavDataType } from "@/types/SearchResults"
import navigateSearch from "@/libs/navigateSearch"
import { useEffect, useState } from "react"
import searchWiki from "@/libs/SearchWiki"
import useDebounce from "@/hooks/useDebounce"



export default function Search() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchVal, setSearchVal] = useState("")
  const { searchTerm, limit } = useParams<string>()
  console.log("limit", limit)
  const navigate = useNavigate()
  const debounceValue = useDebounce(searchVal, 2000)
  const { searchNavData, setSearchNavData } = useSearchNav()
  const [searchResults, setSearchResults] = useState<ReturnSearchResults>({
    total: 0,
    limit: limit ? Number(limit) : 10
  })


  async function fetchSearch(searchVal?: string) {
    setIsLoading(true)
    const apiParam = {
      term: searchVal ? searchVal : searchTerm ? searchTerm : searchNavData.searchTerm,
      limit: limit ? Number(limit) : 10
    }
    await searchWiki.getSearchResult(apiParam).then(data => {
      setSearchResults(data)
      setSearchNavData({
        ...searchNavData,
        searchTerm: searchTerm || "",
        history: [...searchNavData.history, searchNavData.searchTerm],
        limit: limit ? Number(limit) : 10,
      })
    })
    setIsLoading(false)
  }

  function navigateSearchHandle(searchVal: string) {
    console.log("limits", searchNavData)
    setSearchNavData({
      ...searchNavData,
      history: [...searchNavData.history, searchNavData.searchTerm]
    })
    //navigate(navigateSearch(navProps))
    navigate(navigateSearch({
      ...searchNavData,
      searchTerm: searchVal,
      limit: limit,
    }))
  }
  function navigateLimit(limit: string) {
    const navProps = {
      ...searchNavData,
      limit: Number(limit)
    }
    setSearchNavData(navProps)
    navigate(navigateSearch(navProps))
  }


  useEffect(() => {
    if (searchVal) {
      fetchSearch(searchVal)
      navigate(navigateSearch({
        ...searchNavData,
        searchTerm: searchVal,
        limit: limit,
      }))
    }
  }, [debounceValue]);

  useEffect(() => {
    fetchSearch()
  }, [searchTerm, limit])


  return (
    <div className="min-h-dvh md:pt-5 bg-search-light dark:bg-search-dark">
      <header className="grid md:grid-cols-[auto_400px_95px] p-[10px] border-b-2 border-border-grey-line dark:border-border-line">
        <div className="md:mb-0 mb-[10px] mx-auto md:mx-0">
          <Link to={"/"}>
            <img src={logoDark} alt="image logo" className="max-h-[50px]" />
          </Link>
        </div>
        <div className="mr-5">
          <SearchBar callback={navigateSearchHandle} onTypeCallback={setSearchVal} />
        </div>

        <div className="w-[85px] pt-[5px]">
          <DarkMode />
        </div>


      </header>
      <main className="h-full dark:dark:bg-search-dark bg-white ">
        <div className="grid grid-cols-[auto_300px] md:mx-auto max-w-screen-xl pl-5 h-[50px]">
          <p className="pt-3"><b>{searchResults.total > 0 ? searchResults.total : "No"} Result{searchResults.total !== 1 ? "s" : ""}</b></p>
          <div className="justify-end relative w-full ">
              <select value={searchResults.limit} onChange={(e) => navigateLimit(e.target.value)} className="block appearance-none h-full w-full dark:bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option value={10}>10 results per page</option>
                <option value={20}>20 results per page</option>
                <option value={50}>50 results per page</option>
                <option value={100}>100 results per page</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 dark:text-white text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
        </div>
        <div className="results dark:results-dark">
          {searchResults?.results?.map(item => {
            return (
              <Link to="https://www.linkedin.com/in/markfarl/" target="_blank">
                <div className="min-h-[50px]">
                  <div className="md:mx-auto max-w-screen-xl  p-5 pt-3 pb-0">
                    <p className="md:mx-auto">{item.title}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}