import React from 'react'
import { Route, Routes } from 'react-router'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import AuthMiddleware from './Middleware/AuthMiddleware'
import WorkspaceScreen from './Screens/WorkspaceScreen/WorkspaceScreen'

function App() {


  return (
   <div>
    <Routes>
      <Route path="/" element={<LoginScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
      <Route element={<AuthMiddleware/>} >
        <Route path='/home' element={<HomeScreen/>}/>
        <Route path='/workspace/:workspace_id' element={<WorkspaceScreen/>}/>
        <Route path='/workspace/:workspace_id/:channel_id' element={<WorkspaceScreen/>}/>
      </Route>
    </Routes>
   </div>
  )
}

export default App
