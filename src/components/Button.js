import React, { Children } from 'react'

const Button = ({prop}) => {
  return (
    <div>
        <button className={`${prop === 'paid' ? 'bg-green-400  text-green-700' : prop === 'pending' ? 'bg-amber-500 text-amber-700' : prop === 'draft' && 'bg-gray-400 text-gray-700'} w-28 font-bold rounded-lg py-2 capitalize`}>{prop}</button>
    </div>
  )
}

export default Button