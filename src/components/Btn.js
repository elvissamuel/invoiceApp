import React from 'react'

const Btn = ({prop, myFunc, myFunc2, children}) => {
  return (
    <div>
        <button onClick={myFunc} className={`px-4 py-4 rounded-3xl text-base ${prop}`}>{children}</button>
    </div>
  )
}

export default Btn