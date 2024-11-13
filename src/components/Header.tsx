import { Link } from "react-router-dom"
import logoDark from "@/assets/logo-dark.png"
import SearchBar from "./SearchBar"
import DarkMode from "./DarkMode"
import { Dispatch, SetStateAction } from "react"

type HeaderParam = {
	callback: (arg0: string) => void,
	typeCallback: Dispatch<SetStateAction<string>>,
}

export default function Header({ callback, typeCallback }: HeaderParam) {
  return (
    <header className="grid md:grid-cols-[auto_auto_400px_95px] p-[10px] border-b-2 border-border-grey-line dark:border-border-line">
      <div className="md:mb-0 mb-[10px] mx-auto md:mx-0">
        <Link to={"/"}>
          <img src={logoDark} alt="image logo" className="max-h-[50px]" />
        </Link>
      </div>
      <div>

      </div>
      <div className="md:mr-5">
        <SearchBar callback={callback} onTypeCallback={typeCallback} />
      </div>

      <div className="md:mx-auto w-[85px] pt-[5px]">
        <DarkMode />
      </div>
    </header>
  )
}