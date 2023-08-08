import React, { useContext, useEffect, useState } from 'react'
import plusIcon from '../assets/icon-plus.svg'
import deleteIcon from '../assets/icon-delete.svg'
import { FaTrash } from 'react-icons/fa'
import Button2 from './Button2'
import Btn from './Btn'
import NewItem from './NewItem'
import { InvoiceContext } from '../InvoiceContext'
import invoiceData from '../data-demo.json'


const InvoiceForm = ({data, index}) => {
    const [newItem, setNewItem] = useState([])
    const [count, setCount] = useState(0)

    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [paymentDue, setPaymentDue] = useState('')
    const [description, setDescription] = useState('')
    const [paymentTerms, setPaymentTerms] = useState('')
    // const [dueDate, setDueDate] = useState('')
    const [items, setItems] = useState([])
    const [total, setTotal] = useState('')
    const [senderAddress, setSenderAddress] = useState({street: '', city: '', postCode: '', country: ''})
    const [clientAddress, setClientAddress] = useState({street: '', city: '', postCode: '', country: ''})

    const [status, setStatus] = useState('')
    const {invoiceArray, setInvoiceArray, setDisplayForm} = useContext(InvoiceContext);
    const [currentKey, setCurrentKey] = useState(0)
    const [error, setError] = useState(false)
    

    // const handleValidation = (e) => {
    //     e.preventDefault();
    //     if(name === '' || email === '' || number === ''){
    //         setError(true)
    //     }  else if(email.includes('@') && name.length > 0 && number.length > 0){
    //       setStep2(true)
    //   } else{
    //       setStep2(false)
    //   } 
    // }

    useEffect(()=>{
        setTotal()
    }, [])
    

    const addItem = ()=>{
        const uniqueKey = currentKey
        setCurrentKey(prevKey => prevKey + 1)
        const componentArray = (
            <div key={uniqueKey}> {<NewItem myFunc={handleItemChange} id={uniqueKey} prop={removeItem} data={items} /> }</div>
        )
        setNewItem([...newItem, {key: uniqueKey, component: componentArray}]); 
    }
    
    const discardForm = (e) => {
        e.preventDefault();
        setDisplayForm(false);
    }
    const removeItem = (itemDel)=>{
        setNewItem((prevItems)=>prevItems.filter((item) => itemDel !== item.key))
    }
    const generateRandomString = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';
    
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters[randomIndex];
        }
    
        return randomString;
      };
    const handleSubmit = ()=>{
        const myValues = {id:generateRandomString(), clientName, paymentDue, total: items.reduce((sum, item) => sum + item.total, 0), status: 'pending', clientEmail, clientAddress, senderAddress, paymentTerms, createdAt, items};
        setInvoiceArray((prevData) => [...prevData, myValues]);
        setDisplayForm(false);
        console.log(invoiceArray)
       
    }
    const handleDraft = (e)=>{
        const myValues = {id:generateRandomString(), clientName, paymentDue, total: items.reduce((sum, item) => sum + item.total, 0), status: 'draft', clientEmail, clientAddress, senderAddress, paymentTerms, createdAt, items};
        setInvoiceArray((prevData) => [...prevData, myValues]);
        setDisplayForm(false);
        console.log(invoiceArray)
    }

    const handleSenderAddress = (e) => {
        // const { name, value } = e.target;
        const name = e.target.name;
        const value = e.target.value;
        setSenderAddress((prevAddress) => ({
          ...prevAddress,
          [name]: value
        }));
        console.log(invoiceArray)
      };
      const handleClientAddress = (e) => {
        const { name, value } = e.target;
        setClientAddress((prevAddress) => ({
          ...prevAddress,
          [name]: value
        }));

      };

      const handleItemChange = (index, propertyName, value) => {
        setItems((prevItems) => {
          prevItems[index] = {
            ...prevItems[index],
            [propertyName]: value
          };
          console.log(items)
          return prevItems; 
        });
      };

      const handleNewItem = (objId, propName, val) =>{

        // const indexUpdate = items.findindex((item)=> item.id === objId)
        const itemArray = [...items]
        const newItem = itemArray[objId]
        itemArray[objId] = {...newItem, [propName]:val}
        setItems(itemArray)
        // const updateItemArray = [...targetObj.items, itemObj]
        // updateArray[indexUpdate] = {...targetObj, items: updateItemArray}
        // setInvoiceArray(updateArray) 

      }

      const handleValidation = (e) => {
        e.preventDefault();
        if(clientName === '' || clientEmail === '' || clientAddress.city === '' || clientAddress.country === '' || clientAddress.postCode === '' || clientAddress.street === '' || senderAddress.street === '' || senderAddress.city === '' || senderAddress.postCode === '' || senderAddress.country === '' || paymentDue === '' || createdAt === '' || items.length <= 0){
            setError(true)
      } else{
          setError(false)
          handleSubmit();
      } 
    }

    const handleValidationDraft = (e) => {
        e.preventDefault();
        if(clientName === '' || clientEmail === '' || clientAddress.city === '' || clientAddress.country === '' || clientAddress.postCode === '' || clientAddress.street === '' || senderAddress.street === '' || senderAddress.city === '' || senderAddress.postCode === '' || senderAddress.country === '' || paymentDue === '' || createdAt === '' || items.length <= 0){
            setError(true)
      } else{
          setError(false)
          handleDraft();
      } 
    }
    

  return (
    <div className='bg-slate-800 px-4 py-8 w-full max-w-[720px] absolute top-[5.5rem] xl:top-0 xl:pt-24 z-10 shadow-xl xl:ml-[100px] xl:px-10 '>
        <h2 className='text-3xl font-extrabold mb-10'>New Invoice</h2>

        <form>
            <h3 className='text-indigo-500 font-extrabold'>Bill from</h3>
            <div className='my-4'>
                <label className='block text-base' htmlFor="senderStreet">Street Address</label>
                <input onChange={handleSenderAddress} value={senderAddress.street} className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4'  type="text" name="street" id="senderStreet" />
                {error&&senderAddress.street==='' ? <span className='text-red-500 text-sm'>This field is required</span> : '' }
            </div>

            <div className='md:flex md:gap-4'>
                <div className='flex justify-between gap-4 md:basis-2/3'>
                    <div className=' w-full my-4'>
                        <label className='block text-base' htmlFor="senderCity">City</label>
                        <input onChange={handleSenderAddress} value={senderAddress.city} name='city' className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4' type="text" id='senderCity' />
                        {error&&senderAddress.city==='' ? <span className='text-red-500 text-sm'>This field is required</span> : '' }
                    </div>
                    <div className=' w-full my-4'>
                        <label className='block text-base' htmlFor="senderPostCode">Post Code</label>
                        <input onChange={handleSenderAddress} value={senderAddress.postCode} name='postCode' className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4' type="text" id='senderPostCode' />
                        {error&&senderAddress.postCode==='' ? <span className='text-red-500 text-sm'>This field is required</span> : '' }
                    </div>
                </div>
                <div className='md:basis-1/3 my-4'>
                    <label className='block text-base' htmlFor="senderCountry">Country</label>
                    <input onChange={handleSenderAddress} value={senderAddress.country} className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4' type="text" name="country" id="senderCountry" />
                    {error&&senderAddress.country==='' ? <span className='text-red-500 text-sm'>This field is required</span> : '' }
                </div>
            </div>

            <h3 className='font-extrabold text-indigo-500 mt-16 mb-6'>Bill to</h3>
            <div className='my-4'>
                <label className='block text-base' htmlFor="clientName"> Client's Name</label>
                <input onChange={(e)=>setClientName(e.target.value)} value={clientName} className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4'  type="text" name="" id="clientName" />
                {error&&clientName==='' ? <span className='text-red-500 text-sm'>This field is required</span> : '' }
            </div>

            <div className='my-4'>
                <label classEmail='block text-base' htmlFor="clientEmail">Client's Email</label>
                <input onChange={(e)=>setClientEmail(e.target.value)} value={clientEmail} className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4'  type="email" name="" id="clientEmail" />
                {error&&clientEmail==='' ? <span className='text-red-500 text-sm'>This field is required</span> : '' }
            </div>

            <div className='my-4'>
                <label className='block text-base' htmlFor="clientStreet">Street Address</label>
                <input onChange={handleClientAddress} value={clientAddress.street} className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4'  type="text" name="street" id="clientStreet" />
                {error&&clientAddress.street==='' ? <span className='text-red-500 text-sm'>This field is required</span> : '' }
            </div>

            <div className='md:flex md:gap-4 '>
                <div className='flex gap-4 md:basis-2/3'>
                    <div className='w-full my-4'>
                        <label className='block text-base' htmlFor="clientCity">City</label>
                        <input onChange={handleClientAddress} value={clientAddress.city} className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4' name='city' type="text" id='clientCity' />
                        {error&&clientAddress.city==='' ? <span className='text-red-500 text-sm'>This field is required</span> : '' }
                    </div>
                    <div className='w-full my-4'>
                        <label className='block text-base' htmlFor="clientPostCode">Post Code</label>
                        <input onChange={handleClientAddress} value={clientAddress.postCode} className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4' name='postCode' type="text" id='clientPostCode' />
                        {error&&clientAddress.postCode==='' ? <span className='text-red-500 text-sm'>This field is required</span> : '' }
                    </div>
                </div>
                <div className='my-4 md:basis-1/3'>
                    <label className='block text-base' htmlFor="clientCountry">Country</label>
                    <input onChange={handleClientAddress} value={clientAddress.country} className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4'  type="text" name="country" id="clientCountry" />
                    {error&&clientAddress.country==='' ? <span className='text-red-500 text-sm'>This field is required</span> : '' }
                </div>
            </div>

            <div className="my-4">
                <label className='block text-base' htmlFor="exDate">Issue Date</label>
                <input onChange={(e)=>{setCreatedAt(e.target.value)}} value={createdAt} className='w-full bg-slate-700 py-3  px-4'  type="date" name="paymentDue" id="exDate" />
                {error&&createdAt==='' ? <span className='text-red-500 text-sm'>This field is required</span> : '' }
            </div>
            <div className="my-4">
                <label className='block text-base' htmlFor="exDate">Due Date</label>
                <input onChange={(e)=>{setPaymentDue(e.target.value)}} value={paymentDue} className='w-full bg-slate-700 py-3  px-4'  type="date" name="paymentDue" id="paymentDue" />
                {error&&paymentDue==='' ? <span className='text-red-500 text-sm'>This field is required</span> : '' }
            </div>

            <div className='md:flex justify-between md:gap-4 items-center'>
                <div className="my-4 md:w-full">
                    <label className='block text-base' htmlFor="payTerms">Payment terms</label>
                    <select onChange={(e)=>setPaymentTerms(e.target.value)} value={paymentTerms} className='w-full bg-slate-700 py-4 outline-none px-4 pr-8'  type="text" name="" id="payTerms">
                        <option value="1">Net 1 Day</option>
                        <option value="7">Net 7 days</option>
                        <option value="14">Net 14 Days</option>
                        <option value="30">Net 30 Days</option>
                    </select>
                </div>
                <div className="my-4 md:w-full">
                    <label className='block text-base' htmlFor="projectDesc">Project Description</label>
                    <input onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full bg-slate-700 py-3 rounded-lg outline-none px-4'  type="text" name="" id="projectDesc" />
                </div>
            </div>
            <h2>Item List</h2>
            {error&&items.length <= 0 ? <span className='text-red-500 text-sm'>This field is required</span> : '' }


            {
                newItem.map((item, index)=>{
                    return item.component
                })
            }

            <button onClick={(e)=>{e.preventDefault(); addItem();}} className= {`w-full bg-slate-700 py-4 rounded-3xl shadow mt-4 mb-8 flex justify-center gap-2 items-center`}> <img src={plusIcon} alt="" /> <span> Add New Item</span> </button>

            <div className='flex justify-between gap-2 items-center mt-20'>
                <Btn myFunc={discardForm} className='basis-1/2' prop='bg-slate-50 text-indigo-500'>Discard </Btn>
                
                <div className='flex gap-2'>
                    <Btn myFunc={handleValidationDraft} prop='bg-slate-700 text-slate-50'>Save to Draft </Btn>
                    {/* <Btn myFunc={handleSubmit} prop='bg-indigo-500 text-slate-50'>Save & Send </Btn> */}
                    <button onClick={handleValidation} className={`px-4 py-4 rounded-3xl text-base bg-indigo-500 text-slate-50`}>Save & Send</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default InvoiceForm