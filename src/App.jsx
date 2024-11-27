import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MemberManagement from './components/MemberManagement'
import ActivityLogs from './components/ActivityLogs'
import Homepage from './components/HomePage'
const App = () => {
  return (
    <Router>
      <div >
          <Sidebar />
          <div className='flex-grow' >
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/dashboard' element={<MemberManagement />} />
              <Route path='/activityLogs' element={<ActivityLogs />} />
            </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App