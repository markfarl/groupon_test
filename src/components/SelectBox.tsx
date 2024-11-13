type SelectBoxParam = {
	limit: number,
	callback: (arg0: string) => void,
}

export default function SelectBox({limit, callback}: SelectBoxParam){
  return(
    <div className="justify-end relative w-full ">
      <select value={limit} onChange={(e) => callback(e.target.value)} className="block appearance-none h-full w-full dark:bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option value={10}>10 results per page</option>
        <option value={20}>20 results per page</option>
        <option value={50}>50 results per page</option>
        <option value={100}>100 results per page</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 dark:text-white text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </div>
  )
}