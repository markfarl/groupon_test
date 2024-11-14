import logo from "@/assets/logo.png"
import logoDark from "@/assets/logo-dark.png"
import DarkMode from "@/components/DarkMode"
import SearchBar from "@/components/SearchBar"
import navigateSearch from "@/libs/navigateSearch"
import { Link, useNavigate } from "react-router-dom"
import { useSearchNav } from "@/contexts/SearchNavContext"
import { linkEffectSmall } from "@/constants/style"

export default function Home() {
  const { searchNavData, setSearchNavData } = useSearchNav()
  const navigate = useNavigate();
  function navigateSearchHandle(searchTerm: string) {
    setSearchNavData({
      ...searchNavData
    })
    navigate(navigateSearch({
      ...searchNavData,
      searchTerm
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

      <div className="mx-auto mt-5 md:mt-10 w-[85px]">
        <DarkMode />
      </div>

      <div className="results dark:results-dark">
        {searchNavData.history.length > 0 &&
          <div className="min-h-[50px]">
            <div className="md:mx-auto max-w-screen-xl  p-5 pt-3 pb-0">
              <b>Search History</b>
            </div>
          </div>}
        {searchNavData.history.map(item => {
          return (
            <Link to={`search/${item}/10`}>
              <div className={`${linkEffectSmall} min-h-[50px]`}>
                <div className="md:mx-auto max-w-screen-xl  p-5 pt-3 pb-0">
                  <p>{item}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}