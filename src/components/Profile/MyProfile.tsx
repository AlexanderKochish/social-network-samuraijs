import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { IProfileForm } from '../../interfaces/interfaces'
import { getStatusAsyncThunk, profileStatusAsyncThunk, putProfileAsyncThunk } from '../../store/slices/profile.slice'
import { useEffect } from 'react'

const MyProfile = () => {
    const dispatch = useAppDispatch()
    const { currentUser } = useAppSelector((state) => state.auth)
    const { userStatus } = useAppSelector((state) => state.profile)
    const { 
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm<IProfileForm>()
    
    const onSubmit: SubmitHandler<IProfileForm> = async(data): Promise<void> => {
        await dispatch(putProfileAsyncThunk(data.image[0]))
        await dispatch(profileStatusAsyncThunk(data.status))
    }

    useEffect(() => {
        if(!currentUser.fullName) return
        dispatch(getStatusAsyncThunk(currentUser.userId))
    }, [])
    
  return (
    <div className='w-full h-screen py-10 pl-[280px]'>
        <div className='max-w-[1200px] h-screen mx-auto'>
            <div className='top-0 right-0 w-full relative h-[300px] bg-slate-400'>
                <div className='mt-20 absolute -bottom-24 left-20'>
                    <div className='flex items-center'>
                    <div className='w-[228px] h-[228px] rounded-full border-blue-600 border-[3px] shadow-md'>
                        <img className='object-cover rounded-full w-56 h-56' src={`${currentUser.photos?.large}`} alt="my-profile-image" />
                    </div>
                    <div className='ml-10 text-3xl text-white font-bold'>
                        <h2>{currentUser?.fullName}</h2>
                        <p>{userStatus}</p>
                    </div>
                    </div>
                </div>
            </div>
            <div className='max-w-[850px] ml-auto py-10'>
                <ul>
                    <li>about me: {currentUser.aboutMe || 'Not selected'}</li>
                    <li>about job: {currentUser.lookingForAJobDescription || 'Not selected'}</li>
                    <li>Github: {currentUser.contacts.github || 'Not selected'}</li>
                    <li>Web Site: {currentUser.contacts.website || 'Not selected'}</li>
                </ul>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-3 w-96 min-h-4 p-3'>
                <input type="file" {...register('image', { required: false })}/>
                <input 
                className='p-2' 
                type="text" 
                {...register('status', { required: false })}
                placeholder='Your status'
                />
                <button>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default MyProfile
