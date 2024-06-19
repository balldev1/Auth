"use client"
import {useState, useCallback, useEffect} from "react";
import {signIn, useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            // If user is authenticated, redirect to the desired route
            router.push('/');
        }
    }, [status, router]);

    const login = useCallback(async () => {
        try {
            const result = await signIn('credentials', {
                redirect: false, // Prevent automatic redirect to manage it manually
                email,
                password,
            });

            if (result?.error) {
                alert('รหัสผิด');
            } else {
                router.push('/'); // Redirect to your desired route
            }
        } catch (error) {
            console.log(error);
        }
    }, [email, password]);

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <input
                                onChange={(ev: any) => setEmail(ev.target.value)}
                                id="email"
                                type="email"
                                value={email}
                                className="input input-bordered" required
                                placeholder="username"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                onChange={(ev: any) => setPassword(ev.target.value)}
                                id="password"
                                type="password"
                                value={password}
                                placeholder="password" className="input input-bordered"
                                required/>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button onClick={login}
                                    className="btn btn-primary">Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;