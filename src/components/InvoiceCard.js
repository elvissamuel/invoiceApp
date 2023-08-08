import React, { useContext } from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Button from './Button'
import { InvoiceContext } from '../InvoiceContext'

const InvoiceCard = ({prop, index}) => {

  const {invoiceArray,} = useContext(InvoiceContext)

  // const grandTotal = invoiceArray.items.reduce((sum, item) => sum + item.total, 0)

  
  return (
    <Link to={`/invoice-${index}`}>
      <div key={index} className='rounded-lg p-5 lg:p-10 mx-3 my-5 font-lato bg-slate-700 lg:max-w-[900px] lg:mx-auto cursor-pointer lg:hover:scale-105 lg:hover:border lg:hover:border-indigo-500 lg:transition-all lg:duration-300'>
        <div className='flex flex-col lg:flex-row lg:justify-center lg:gap-8 lg:items-center gap-2 lg:px-8 '>
          <div className='flex justify-between items-center basis-2/5 lg:pr-10'>
            <p className='font-bold'>#{prop.id}</p>
            <p>{prop.clientName}</p>
          </div>
          <div className='flex justify-between items-center lg:basis-3/5 '>
            <div className='flex flex-col lg:flex-row lg:gap-10 gap-1'>
              <p>Due {prop.paymentDue}</p>
              <p className='font-extrabold'>$ {prop.total}</p>
            </div>
            {/* <button className={`${prop.status === 'paid' ? 'bg-green-400  text-green-700' : prop.status === 'pending' ? 'bg-amber-500 text-amber-700' : prop.status === 'draft' && 'bg-gray-400 text-gray-700'} w-28 font-bold rounded-lg py-2 capitalize`}>{prop.status}</button> */}
            <Button prop={prop.status} />
          </div>
          {window.innerWidth > 880 && (<FaAngleRight className='text-indigo-500'  />)}
        </div>
      </div>
    </Link>
  )
}

export default InvoiceCard