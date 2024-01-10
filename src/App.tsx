import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import SideBar from './components/SideBar/SideBar'

const App = () => {
  return (
    <div>
      <Header/>
      <SideBar/>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  )
}

export default App


