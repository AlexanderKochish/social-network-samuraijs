import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

const Pagination = ({hadleChangePage, pagination, handlePrevPage, handleNextPage,  page}: any) => {
  return (
    <div className="flex items-start w-full justify-center space-x-5">
        <button className="p-2 bg-black/80 rounded-full hover:bg-black duration-300" onClick={handlePrevPage}>
        <AiOutlineLeft className='text-xl text-white'/>
        </button>
        <ul className="flex space-x-2 mb-4 items-center">
          {pagination()?.map((p: number, i: number) => (
          <li key={i}>
          <button
            onClick={() => hadleChangePage(p)}
            className={
              p === page
                ? "border grid place-items-center px-1 w-10 h-10 text-white bg-red-600 text-base p-2 rounded-full"
                : "border grid place-items-center px-1 w-10 h-10 text-white bg-blue-600 text-base p-2 rounded-full"
            }
          >
            {p}
          </button>
        </li>)
          )}
        </ul>
        <button className="p-2 bg-black/80 rounded-full hover:bg-black duration-300" onClick={handleNextPage}>
        <AiOutlineRight className='text-xl text-white'/>
        </button>
      </div>
   
  )
}

export default Pagination
