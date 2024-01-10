import { Link } from "react-router-dom"

const SideBar = () => {
  return (
    <aside className="fixed w-[250px] top-0 left-0 h-screen bg-slate-700">
      <div className="w-full grid place-items-center">
        <ul className="pt-20 text-white space-y-3 w-full pl-10">
            <Link to={"users"}>
              <li className="px-3 w-full hover:bg-slate-900 duration-300">Users</li>
            </Link>
            <Link to={"my-profile"}>
              <li className="px-3 w-full hover:bg-slate-900 duration-300">My Profile</li>
            </Link>
        </ul>
      </div>
    </aside>
  )
}

export default SideBar
