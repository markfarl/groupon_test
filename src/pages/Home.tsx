import logo from "@/assets/logo.png"
import logoDark from "@/assets/logo-dark.png"
import DarkMode from "@/components/DarkMode"
import SearchBar from "@/components/SearchBar"
import navigateSearch from "@/libs/navigateSearch"
import { useNavigate } from "react-router-dom"
import { useSearchNav } from "@/contexts/SearchNavContext"

export default function Home() {
  const { searchNavData, setSearchNavData } = useSearchNav()
  const navigate = useNavigate();
  function navigateSearchHandle(searchTerm: string) {
    setSearchNavData({
      ...searchNavData,
      history: [...searchNavData.history, searchNavData.searchTerm]
    })
    navigate(navigateSearch({
      ...searchNavData,
      searchTerm,
      history: [...searchNavData.history, searchNavData.searchTerm]
    }))
  }

  return (
    <div className="min-h-full bg-home-light dark:bg-home-dark">
      <header className="p-10 md:mb-20">
        <img src={logo} alt="image logo" className="mx-auto dark:hidden block" />
        <img src={logoDark} alt="image logo" className="mx-auto hidden dark:block" />
        <p className="text-center mt-5">The Lightweight Wikipedia interface....</p>
      </header>

      <div className="mx-auto max-w-[400px]">

        <SearchBar callback={navigateSearchHandle} />
      </div>

      <div className="mx-auto md:mt-10 w-[85px]">
        <DarkMode />
      </div>
      <div className="p-5">
        {searchNavData.history.length > 0 && <b>Search History</b>}
        {searchNavData.history.map(item => {
          return (
            <p>{item}</p>
          )
        })}
      </div>
    </div>
  )
}