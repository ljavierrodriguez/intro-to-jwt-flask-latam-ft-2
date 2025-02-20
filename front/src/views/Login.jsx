import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    const { user, login, checkAuth } = useAuth()

    const [error, setError] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        const data = await login({ email, password })

        if(data.error){
            setError(data?.error)
        } else {
            setError(null)
            sessionStorage.setItem('access_token', data.access_token)
            await checkAuth()
            navigate('/profile')
        }
    }

    if (user) return <Navigate to="/profile" replace />

    return (
        <div className='w-75 mx-auto my-5'>
            {
                !!error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> {error}.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )
            }
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" placeholder='email@domain.com'
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" className="form-control" placeholder='********'
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary btm-sm py-2 w-100">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login