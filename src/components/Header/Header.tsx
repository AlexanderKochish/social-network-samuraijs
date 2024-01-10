import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks"
import { AiOutlineSearch } from "react-icons/ai";
import { searchUserAsyncThunk, setUserName } from "../../store/slices/users.slice";

const Header = () => {
    const { currentUser } = useAppSelector((state) => state.auth)
    const { searchUserByName } = useAppSelector((state) => state.users)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSearch = (): void => {
        if(!searchUserByName.trim()) return
        dispatch(searchUserAsyncThunk(searchUserByName))
        dispatch(setUserName(''))
        navigate('users')
    }

  return (
    <header className="bg-slate-800 shadow-md fixed top-0 left-0 z-50 w-full min-h-10">
        <div className="max-w-[1200px] px-5 mx-auto h-full">
            <div className="flex items-center justify-between py-2">
                <h1 className="text-white">
                    LOGO
                </h1>
                <div>
                    <div className="flex items-center px-1 pr-0 bg-white">
                        <AiOutlineSearch className='text-xl'/>
                        <input 
                            className="border-none outline-none p-1"
                            type="text" 
                            value={searchUserByName} 
                            onChange={(e) => dispatch(setUserName(e.target.value))}
                        />
                        <button className="bg-blue-600 p-1 text-white hover:bg-blue-500" onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className="flex items-center space-x-5">
                    <div className="w-10 h-10">
                    <img className="w-10 h-10 rounded-full" src={`${currentUser.photos?.small}`} alt="profile photo" />
                    </div>
                    <div className="flex items-center space-x-5">
                        { !currentUser.userId ? <Link to={"/auth"}>
                            <button className="px-2 text-white bg-blue-500 rounded-md hover:bg-blue-400">Login</button>
                        </Link>
                        :
                        <button className="px-2 text-white bg-red-500 rounded-md  hover:bg-red-400">Loguot</button>}
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header
