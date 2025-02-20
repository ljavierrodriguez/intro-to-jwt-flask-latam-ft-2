import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {

    const { user, updateProfile, checkAuth } = useAuth()

    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [biography, setBiography] = useState('')
    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        const data = await updateProfile({ biography, facebook, instagram })

        if (data.error) {
            setMessage(null)
            setError(data?.error)
        } else {
            setError(null)
            setMessage(data?.message)
        }
    }

    useEffect(() => {
        setBiography(user?.profile?.biography)
        setFacebook(user?.profile?.facebook)
        setInstagram(user?.profile?.instagram)
    }, [])

    return (
        <div className='w-75 mx-auto my-5'>
            {
                !!error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> {error}.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setError(null)}></button>
                    </div>
                )
            }

            {
                !!message && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Success!</strong> {message}.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setMessage(null)}></button>
                    </div>
                )
            }
            <h3>Profile</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" placeholder='email@domain.com'
                        defaultValue={user.email} disabled
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="biography" className="form-label">Biography</label>
                    <textarea id="biography" className="form-control" placeholder='My biography' value={biography} onChange={e => setBiography(e.target.value)}></textarea>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="facebook" className="form-label">Facebook</label>
                    <input type="text" id="facebook" className="form-control" placeholder="Facebook" value={facebook} onChange={e => setFacebook(e.target.value)} />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="instagram" className="form-label">Instagram</label>
                    <input type="text" id="instagram" className="form-control" placeholder="Instagram" value={instagram} onChange={e => setInstagram(e.target.value)} />
                </div>

                <button className="btn btn-warning btm-sm py-2 w-100">
                    Update
                </button>
            </form>
        </div>
    )
}

export default Profile