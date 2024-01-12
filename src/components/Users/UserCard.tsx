import { IUserCardProps } from "../../interfaces/interfaces"
import placeholder from '../../images/avatar-1577909_1280.webp'
import { useAppDispatch } from "../../store/hooks/hooks"
import { getProfileAsyncThunk } from "../../store/slices/profile.slice"
import { useNavigate } from "react-router-dom"
import { addFollowAsyncThunk } from "../../store/slices/follow.slice"

const UserCard: React.FC<IUserCardProps> = ({ user }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userPhoto = user.photos.large?`${user?.photos.large}` : `${placeholder}`;

  const selectUserById = (id: number) => {
    dispatch(getProfileAsyncThunk(id))
    navigate(`profile/${id}`)
  }

  const addFollow = (id: number): void => {
    dispatch(addFollowAsyncThunk(id))
  }

  return (
    <li key={user.id} className="bg-slate-200 shadow-md p-2 w-60 h-80 overflow-hidden">
        <div onClick={() => selectUserById(user.id)}>
        <img 
          src={userPhoto} 
          className="object-cover w-full h-full" 
          alt="user photo" 
          loading="lazy"
        />
      </div>
      <ul>
        <li>
          <div className="font-medium text-gray-700">
            name: <span className="text-black italic font-normal">{user.name}</span>
          </div>
        </li>
        <li>
          <div className="font-medium text-gray-700">
            status: <span className="text-black italic font-light">{user.status || "Status not specified"}</span>
          </div>
        </li>
      </ul> 
      <button 
        className="px-2 bg-blue-600 hover:bg-blue-500 duration-300 text-white rounded-sm mt-1" 
        onClick={() => addFollow(user.id)}
      >
        follow
      </button>
    </li>
  )
}

export default UserCard
