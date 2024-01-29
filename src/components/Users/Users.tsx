import { useState } from "react";
import { useGetAllUsersQuery, useSearchUserQuery } from "../../store/slices/users/users.api";
import UserCard from "./UserCard";
import PreLoader from "../UI/PreLoader";
import { useAppSelector } from "../../store/hooks/hooks";
import Pagination from "../UI/Pagination";

const Users = () => {
  const [curPage, setCurPage] = useState<number>(15);
  const [start, setStart] = useState(0);
  const [page, setPage] = useState(localStorage.getItem('current_page') || 1)
  let count = 9;
  const { searchString } = useAppSelector((state) => state.users)
  const { data, isLoading } = useGetAllUsersQuery({page , count})
  const { data: findUser } =  useSearchUserQuery(searchString, {skip: !searchString})
  let totalPages: number = Math.ceil(data?.totalCount / count);
  
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


  const hadleChangePage = (p: number): void => {
    localStorage.setItem('current_page', p.toString())
    setPage(p)
  };

  return (
    <div className="max-w-[1200px] mx-auto h-screen flex flex-col pb-10">
      <Pagination 
        hadleChangePage={hadleChangePage} 
        pagination={pagination} 
        handlePrevPage={handlePrevPage} 
        handleNextPage={handleNextPage}  
        page={page}
      />
      <ul className="grid grid-cols-3 max-w-[1200px] mx-auto h-screen gap-3">
        {isLoading ? (
          <PreLoader />
        ) : (
          !searchString?
          data?.items.map((user: any) => <UserCard key={user.id} user={user} />):
          findUser?.items.map((user: any) => <UserCard key={user.id} user={user} />)
        )}
      </ul>
    </div>
  );
};

export default Users;