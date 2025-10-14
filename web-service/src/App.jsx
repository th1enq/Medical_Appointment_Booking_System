import { useCallback } from 'react'
import LoginPage from './components/Login'
import {Route, Routes} from "react-router-dom"
import SignUp from './components/Signup'


const App = () => {
  return (
    <>
      <Routes>
          <Route
            path="/login"
            element={
              <div>
                <LoginPage/>
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div>
                <SignUp/>
              </div>
            }
          />
      </Routes>
      </>
  )
  
}
export default App
