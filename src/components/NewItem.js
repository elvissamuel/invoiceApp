import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'


const NewItem = ({prop, data, myDB, id, myFunc}) => {
    // const [pri, setPri] = useState(0)
    // const [qty, setQty] = useState(0)
    // const [total, setTotal] = useState(pri*qty)

    const [name, setName] = useState(data.name)
    const [quantity, setQuantity] = useState(data.quantity)
    const [price, setPrice] = useState(data.price)
    const [total, setTotal] = useState(price*quantity)


    useEffect(() => {
        setTotal(price * quantity);
        myFunc(id, 'total', total);
      }, [price, quantity]);
      useEffect(()=>{
        myFunc(id, 'name', name);
        myFunc(id, 'price', price);
        myFunc(id, 'quantity', quantity);
        myFunc(id, 'total', total);
        myFunc(id, 'id', id);
      }, [price, name, quantity])

    //   useEffect(()=>{
    //     myFunc(id, 'total', total)
    //   }, [total]);
    // useEffect(()=>{
    //    setRealTotal(data[2].price)
    //    console.log(realTotal)
    // }, [data[2].price])
    console.log('show my array', data)
    console.log('show my length', data.length)
    
    // const calculateTotal = () => {
    //     const quantity = data[6+id].items[id].quantity;
    //     const price = data[6+id].items[id].price;
    //     return quantity * price;
    //   };
    // const itemPrice = data[id].price;
  return (
    <div>
        <div className='md:flex gap-4 '>
            {/* <p className='text-red-500'>{id}</p> */}
            <div className='my-4 md:basis-1/3'>
                <label className='block text-base' htmlFor="itemName">Name</label>
                <input onInput={(e)=>{setName(e.target.value); myFunc(id, 'name', name)}} value={data.name}  className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4'  type="text" name="" id="itemName" />
            </div>
            <div className='flex items-center gap-4 md:basis-2/3'>
                <div className='my-4 basis-1/5 md:basis-1/3'>
                    <label className='block text-base' htmlFor="qty">Qun.</label>
                    <input onInput={(e)=>{setQuantity(e.target.value); myFunc(id, 'quantity', quantity)}} value={data.quantity} className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4'  type="text" id="qty" />
                </div>
                <div className='my-4 basis-2/5 md:basis-1/3'>
                    <label className='block text-base' htmlFor="itemPrice">Price</label>
                    <input onInput={(e)=>{setPrice(e.target.value); myFunc(id, 'price', price)}} value={data.price} className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4'  type="text" name="" id="itemPrice" />
                </div>
                <div className='my-4 basis-2/5 md:basis-1/3 '>
                    <label className='block text-base' htmlFor="itemTotal">Total</label>
                    <input readOnly value={total} className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4'  type="text" name="" id="itemTotal" />
                </div>
                <FaTrash className='mt-6 cursor-pointer' onClick={()=>   prop(id)} size={16} color='red' />
            </div>
        </div>
    </div>
  )
}

export default NewItem