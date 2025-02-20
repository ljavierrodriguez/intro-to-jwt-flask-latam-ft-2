import { createContext, useContext, useEffect, useState } from "react";
import { baseURL } from "../config";
import { Navigate } from "react-router-dom";


const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            if(!sessionStorage.getItem('access_token')) 
                return <Navigate to="/login" replace />

            const token = sessionStorage.getItem('access_token')
        
            const response = await fetch(`${baseURL}/api/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if(response.status == 401) <Navigate to="/login" replace />
            const data = await response.json()
            setUser(data.user)

        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }
    const login = async (credentials) => {
        try {
            const response = await fetch(`${baseURL}/api/login`, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.log(error.message)
        }
    }
    const register = async (datos) => {}
    const logout = async () => {
        if(sessionStorage.getItem('access_token')){
            sessionStorage.clear()
            setUser(null)
        }
    }

    const updateProfile = async (datos) => {
        try {
            if(!sessionStorage.getItem('access_token')) 
                return <Navigate to="/login" replace />

            const token = sessionStorage.getItem('access_token')
        
            const response = await fetch(`${baseURL}/api/profile`, {
                method: 'PUT',
                body: JSON.stringify(datos),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if(response.status == 401) return <Navigate to="/login" replace />
            const data = await response.json()
            setUser(data.user)
            return data

        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, checkAuth, updateProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom Hooks para user el contexto de autenticacion
export const useAuth = () => useContext(AuthContext)