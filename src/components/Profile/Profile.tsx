import { useAppSelector } from "../../store/hooks/hooks"

const Profile = () => {
  const { profile } = useAppSelector((state) => state.profile)

  return (
    <div className='w-full h-screen py-10 pl-[280px]'>
      <div className='max-w-[1200px] h-screen mx-auto'>
          <div className='top-0 right-0 w-full relative h-[300px] bg-slate-400'>
              <div className='mt-20 absolute -bottom-24 left-20'>
                  <div className='flex items-center'>
                  <div className='w-[228px] h-[228px] rounded-full border-blue-600 border-[3px] shadow-md'>
                      <img className='object-cover rounded-full w-56 h-56' src={`${profile.photos?.large}`} alt="my-profile-image" />
                  </div>
                  <div className='ml-10 text-3xl text-white font-bold'>
                      <h2>{profile?.fullName}</h2>
                  </div>
                  </div>
              </div>
          </div>
          <div className='max-w-[850px] ml-auto py-10'>
              <ul>
                  <li>about me: {profile.aboutMe || 'Not selected'}</li>
                  <li>about job: {profile.lookingForAJobDescription || 'Not selected'}</li>
                  <li>Github: {profile.contacts.github || 'Not selected'}</li>
                  <li>Web Site: {profile.contacts.website || 'Not selected'}</li>
              </ul>
          </div>
      </div>
    </div>
  )
}

export default Profile
