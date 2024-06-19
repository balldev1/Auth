"use client"
import react, {useState, useCallback} from 'react'
import {signIn} from 'next-auth/react'

const LoginPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                username,
                password,
                redirect: false,
                callbackUrl: '/'
            });


        } catch (error) {
            console.log(error)
        }
    }, [username, password])

    return (
        <div className="flex flex-col">
            <input
                onChange={(ev: any) => setUsername(ev.target.value)}
                id="username"
                type="username"
                value={username}
            />
            <input
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
            />
            <button onClick={login}
                    className='bg-red-600 py-3 text-white rounded-md w-full mt-5 hover:bg-red-700 transition'>
                login
            </button>

        </div>
    )
}

export default LoginPage;