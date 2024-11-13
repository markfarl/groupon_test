import { useEffect, useState } from "react"

export default function DarkMode() {
  const linkEffect = "transform transition duration-200 hover:scale-105 hover:animate-pulse"
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (document.body.classList.value === "dark") {
      setDark(true)
    }
  }, [])

  const handleDarkMode = () => {
    setDark(!dark)
    document.body.classList.toggle("dark")
    console.log("dedede")
  }
  return (
    <>
      <div
        className={`${linkEffect} mr-[5px] colorSchemeSquare bg-white ${!dark ? "border-border-line" : "border-none"}`}
        onClick={handleDarkMode}
      >
      </div>
      <div
        className={`${linkEffect} mx-auto colorSchemeSquare bg-black ${dark ? "border-border-line" : "border-none"} `}
        onClick={handleDarkMode}
      >
      </div>
    </>
  )
}