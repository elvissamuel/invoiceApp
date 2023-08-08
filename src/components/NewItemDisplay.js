import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

const NewItemDisplay = ({items, id, func, delItem, setIt}) => {
    // const [allItems, setAllItems] = useState()
    const [name, setName] = useState(items.name)
    const [quantity, setQuantity] = useState(items.quantity)
    const [price, setPrice] = useState(items.price)
    const [total, setTotal] = useState(price*quantity)

    useEffect(()=>{
        setTotal(price*quantity);
        func(id, 'total', total);
    }, [price, quantity])
    useEffect(()=>{
        func(id, 'name', name);
        func(id, 'price', price);
        func(id, 'quantity', quantity);
        func(id, 'total', total);
        func(id, 'id', id);
    }, [name, quantity, price])
    // useEffect(()=>{
    //     setIt(items)
    // }, [items])
  return (
    <div>
        <div className='md:flex gap-4 '>
            {/* <p className='text-red-500'>{id}</p> */}
            <div className='my-4 md:basis-1/3'>
                <label className='block text-base' htmlFor="itemName">Name</label>
                <input className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4' value={name} onChange={(e)=>{setName(e.target.value); func(id, 'name', name) }}  type="text" name="name" id="itemName" />
            </div>
            <div className='flex items-center gap-4 md:basis-2/3'>
                <div className='my-4 basis-1/5 md:basis-1/3'>
                    <label className='block text-base' htmlFor="qty">Qun.</label>
                    <input className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4' value={quantity} onChange={(e)=>{setQuantity(e.target.value); func(id, 'quantity', quantity) }} name='quantity' type="text" id="qty" />
                </div>
                <div className='my-4 basis-2/5 md:basis-1/3'>
                    <label className='block text-base' htmlFor="itemPrice">Price</label>
                    <input className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4' value={price} onChange={(e)=>{setPrice(e.target.value); func(id, 'price', price) }} type="text" name="price" id="itemPrice" />
                </div>
                <div className='my-4 basis-2/5 md:basis-1/3 '>
                    <label className='block text-base' htmlFor="itemTotal">Total</label>
                    <input className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4' value={total} type="text" name="total" id="itemTotal" />
                </div>
                <FaTrash className='mt-6 cursor-pointer' size={16} color='red' onClick={()=>delItem(id)} />
            </div>
        </div>
    </div>
  )
}

export default NewItemDisplay