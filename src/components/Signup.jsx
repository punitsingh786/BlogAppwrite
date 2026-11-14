import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import Button from './Button'
import Input from './Input'
import Logo from './Logo'

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const create = async (data) => {
    setError("")
    try {
      const session = await authService.createAccount(data)
      if (session) {
        const currentUser = await authService.getCurrentUser()
        if (currentUser) dispatch(login({ userData: currentUser }))
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
        <h2 className="text-center text-2xl font-bold leading-tight">Create your account</h2>
        <p className="mt-2 text-center text-base text-slate-500">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />
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
              label="Password (min 8 characters)"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true, minLength: 8 })}
            />
            <Button type="submit" className="w-full">Create Account</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
