import { IUserCardProps } from "../../interfaces/interfaces"
import placeholder from '../../images/avatar-1577909_1280.webp'
import { useAppDispatch } from "../../store/hooks/hooks"
import { getProfileAsyncThunk } from "../../store/slices/profile.slice"
import { useNavigate } from "react-router-dom"

const UserCard: React.FC<IUserCardProps> = ({ user }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userPhoto = user.photos.large?`${user?.photos.large}` : `${placeholder}`;

  const selectUserById = (id: number) => {
    dispatch(getProfileAsyncThunk(id))
    navigate(`profile/${id}`)
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
    </li>
  )
}

export default UserCard
