import React from 'react'

const Button2 = ({prop, func}) => {
  return (
    <div>
        <button onClick={func} className={`${prop === 'Edit' ? 'bg-slate-50 w-24 text-slate-700' : prop === 'Delete' ? 'bg-red-500 w-24 text-slate-50' : prop === 'Mark as Paid' ? 'bg-indigo-500 text-slate-50 w-36' : ' w-36'}  font-bold rounded-3xl py-3 capitalize`}>{prop}</button>
    </div>
  )
}

export default Button2