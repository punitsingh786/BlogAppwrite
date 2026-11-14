import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { login as authLogin } from '../store/authSlice'
import authService from "../appwrite/auth"
import Button from "./Button"
import Input from "./Input"
import Logo from "./Logo"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin({ userData }))
        navigate("/")
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center w-full px-4">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-slate-200 shadow-sm">
        <div className="mb-4 flex justify-center">
          <Logo width="auto" />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-slate-500">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full">Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
