import { linkEffect } from "@/constants/style"
import { useEffect, useState } from "react"

export default function DarkMode() {

  const [dark, setDark] = useState<boolean>(localStorage.getItem("darkmode") === "true")

  useEffect(() => {
    if (document.body.classList.value === "dark") 
      setDark(true)
    if(dark)
      document.body.classList.value = "dark"
  }, [dark])

  const handleDarkMode = () => {
    // Set local storage
    localStorage.setItem("darkmode", `${!dark}`)
    setDark(!dark)
    document.body.classList.toggle("dark")
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