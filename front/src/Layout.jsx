import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import Profile from './views/Profile'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './views/PrivateRoute'

const Layout = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path='/profile' element={
                       <PrivateRoute>
                           <Profile />
                       </PrivateRoute>
                    } />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Home />} />
                    <Route path='*' element={<h1>Page not found (404)</h1>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default Layout