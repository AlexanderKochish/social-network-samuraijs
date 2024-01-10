import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getAllUserAsyncThunk, setPage } from "../../store/slices/users.slice";
import UserCard from "./UserCard";
import PreLoader from "../UI/PreLoader";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

const Users = () => {
  const [curPage, setCurPage] = useState<number>(15);
  const [start, setStart] = useState(0);
  const dispatch = useAppDispatch();
  const { users, totalCount, page, count, status } = useAppSelector((state) => state.users);
  let totalPages: number = Math.ceil(totalCount / count);

  const pagination = () => {
    let arrPages: number[] = [];
    for (let i: number = 0; i < totalPages; i++) {
      arrPages.push(i + 1);
    }
    const resultArray: number[] = arrPages.slice(start, curPage);
    return resultArray;
  };

  const handleNextPage = () => {
    if (curPage >= totalPages) return;
    setCurPage((prevPage) => prevPage + 15);
    setStart((prevPage) => prevPage + 15);
  };

  const handlePrevPage = () => {
    if (start <= 0) return;
    setStart((prevPage) => prevPage - 15);
    setCurPage((prevPage) => prevPage - 15);
  };

  useEffect(() => {
    dispatch(getAllUserAsyncThunk());
  }, [page]);

  const hadleChangePage = (p: number): void => {
    localStorage.setItem('current_page', p.toString())
    dispatch(setPage(p));
  };

  return (
    <div className="max-w-[1200px] mx-auto h-screen flex flex-col pb-10">
      <div className="flex items-start w-full justify-center space-x-5">
        <button className="p-2 bg-black/80 rounded-full hover:bg-black duration-300" onClick={handlePrevPage}>
        <AiOutlineLeft className='text-xl text-white'/>
        </button>
        <ul className="flex space-x-2 mb-4 items-center">
          {pagination()?.map((p, i) => (
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
            </li>
          ))}
        </ul>
        <button className="p-2 bg-black/80 rounded-full hover:bg-black duration-300" onClick={handleNextPage}>
        <AiOutlineRight className='text-xl text-white'/>
        </button>
      </div>
      
      <ul className="grid grid-cols-3 max-w-[1200px] mx-auto h-screen gap-3">
        {status === "loading" ? (
          <PreLoader />
        ) : (
          users.map((user) => <UserCard key={user.id} user={user} />)
        )}
      </ul>
    </div>
  );
};

export default Users;
