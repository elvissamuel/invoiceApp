import React, { useState } from 'react'

const updateFormItem = () => {
    const [name, setName] = useState()
    const [qunatity, setQuantity] = useState()
    const [price, setPrice] = useState()
    const [total, setTotal] = useState()
  return (
    <div>
        <div className='md:flex gap-4 '>
            <div className='my-4 md:basis-1/3'>
                <label className='block text-base' htmlFor="itemName">Name</label>
                <input className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4' value={items.name} type="text" name="name" id="itemName" />
            </div>
            <div className='flex items-center gap-4 md:basis-2/3'>
                <div className='my-4 basis-1/5 md:basis-1/3'>
                    <label className='block text-base' htmlFor="qty">Qun.</label>
                    <input className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4' value={items.quantity} name='quantity' type="text" id="qty" />
                </div>
                <div className='my-4 basis-2/5 md:basis-1/3'>
                    <label className='block text-base' htmlFor="itemPrice">Price</label>
                    <input className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4' value={items.price} type="text" name="price" id="itemPrice" />
                </div>
                <div className='my-4 basis-2/5 md:basis-1/3 '>
                    <label className='block text-base' htmlFor="itemTotal">Total</label>
                    <input className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4' value={items.total} type="text" name="total" id="itemTotal" />
                </div>
                <FaTrash className='mt-6 cursor-pointer' size={23} color='pink' />
            </div>
        </div>
    </div>
  )
}

export default updateFormItem