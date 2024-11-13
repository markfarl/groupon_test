import { useSearchNav } from "@/contexts/SearchNavContext"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ReturnSearchResults } from "@/types/SearchResults"
import navigateSearch from "@/libs/navigateSearch"
import { useEffect, useState } from "react"
import searchWiki from "@/libs/SearchWiki"
import useDebounce from "@/hooks/useDebounce"
import { linkEffectSmall } from "@/constants/style"
import SelectBox from "@/components/SelectBox"
import Header from "@/components/Header"

export default function Search() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchVal, setSearchVal] = useState("")
  const { searchTerm, limit } = useParams<string>()
  const navigate = useNavigate()
  const debounceValue = useDebounce(searchVal, 2000)
  const { searchNavData, setSearchNavData } = useSearchNav()
  const [searchResults, setSearchResults] = useState<ReturnSearchResults>({
    total: 0,
    limit: limit ? Number(limit) : 20
  })

  async function fetchSearch(searchVal?: string) {
    setIsLoading(true)
    const apiParam = {
      term: searchVal ? searchVal : searchTerm ? searchTerm : searchNavData.searchTerm,
      limit
    }
    await searchWiki.getSearchResult(apiParam).then(data => {
      setSearchResults(data)
      setSearchNavData({
        ...searchNavData,
        searchTerm: searchTerm || "",
        history: [...searchNavData.history, searchNavData.searchTerm],
        limit
      })
    })
    setIsLoading(false)
  }

  function navigateSearchHandle(searchVal: string) {
    setIsLoading(true)
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
      setIsLoading(true)
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
      <Header callback={navigateSearchHandle} typeCallback={setSearchVal} />
      <main className={`h-full dark:dark:bg-search-dark bg-white ${isLoading ? "opacity-10" : ""}`}>
        <div className="grid sm:grid-cols-[auto_300px] md:mx-auto max-w-screen-xl p-1 md:pl-5 min-h-[50px]">
          <p className="pt-3"><b>{searchResults.total > 0 ? searchResults.total : "No"} Result{searchResults.total !== 1 ? "s" : ""}</b></p>
          <SelectBox limit={searchResults.limit} callback={navigateLimit} />
        </div>
        <div className="results dark:results-dark">
          {searchResults?.results?.map(item => {
            return (
              <Link to={item.href} target="_blank">
                <div className={`${linkEffectSmall} min-h-[50px]`}>
                  <div className="md:mx-auto max-w-screen-xl  p-5 pt-3 pb-0">
                    <p>{item.title}</p>
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