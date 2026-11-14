import React, { useId } from 'react'

const Select = React.forwardRef(function Select(
  { options, label, className = "", ...props },
  ref
) {
  const id = useId()
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1 text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-indigo-400 duration-200 border border-slate-300 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
})

export default Select
