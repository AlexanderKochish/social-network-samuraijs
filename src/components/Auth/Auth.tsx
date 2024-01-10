import { useAppDispatch } from '../../store/hooks/hooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import { authMeAsyncThunk, loginAsyncThunk } from '../../store/slices/auth.slice';
import { useNavigate } from 'react-router-dom';

interface ILoginForm {
    email: string;
    password: string;
    rememberMe: boolean;
}

const Auth = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ILoginForm>()
      const onSubmit: SubmitHandler<ILoginForm> = async(data): Promise<void> => {
        await dispatch(loginAsyncThunk(data))
        await dispatch(authMeAsyncThunk())
        navigate('/my-profile')
      }
    
  return (
    <div className='w-full h-screen grid place-items-center'>
      <div>
      <form onSubmit={handleSubmit(onSubmit)} className='w-[300px] min-h-40 shadow-md bg-white flex flex-col justify-around space-y-3 p-3'>
      <h3 className='font-semibold text-2xl'>Sign Up</h3>
        <label className='text-red-500' htmlFor="login_email">{errors.email?.message}</label>
        <input 
        className='p-2 text-md'
        id='login_email'
        type="email" 
        placeholder='Your email'
        {...register("email", { required: true, 
            maxLength: {
            value: 20,
            message: 'Maximum length 20 characters'
            },
            minLength: {
                value: 3,
                message: 'Minimum length 3 characters'
            }
        })}
         />
         <label className='text-red-500' htmlFor="login_password">{errors.password?.message}</label>
          <input 
          className='p-2 text-md'
          id='login_password'
          type="password" 
          placeholder='Your password'
          {...register("password", { required: true })}
          />
          <div className='flex justify-between'>
          <button className='bg-blue-600 hover:bg-blue-500 duration-300 text-white self-start px-2 py-1 rounded-sm'>Login</button>
          <div className='flex items-center space-x-3'>
          <label htmlFor="rememberMe" className='italic'>Remember me</label>
          <input 
            {...register('rememberMe', { required: false })} 
            type="checkbox" 
            name="rememberMe" 
            id="rememberMe" 
          />
          </div>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Auth
