import React, { useContext, useEffect, useState } from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import Button from './Button'
import Button2 from './Button2'
import { useNavigate } from 'react-router-dom';
import { InvoiceContext } from '../InvoiceContext';
import InvoiceForm from './InvoiceForm';
import InvoiceFormDetails from './InvoiceFormDetails';
import Modal from './Modal';

  

const InvoiceDetails = ({prop, id}) => {

    const [modal, setModal] = useState(false)
    const {displayForm, setDisplayForm, invoiceArray, setInvoiceArray} = useContext(InvoiceContext)

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    const handleDeleteInvoice = (id)=>{
        const inv = [...invoiceArray]
        setInvoiceArray(()=>inv.filter((item)=>item.id !== id))
        navigate('/')
    }

    const handleStatus = (ind, stat)=>{
        const indexUpdate = invoiceArray.findIndex((item)=>item.id === ind)
        if(indexUpdate !== -1){
            const inv = [...invoiceArray];
            inv[indexUpdate] = {...inv[indexUpdate], status:stat}

            setInvoiceArray(inv)
        }
        
        console.log('invoice:', invoiceArray)
    }

    // const {grandTotal} = useContext(InvoiceContext)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = ()=>{
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        const cleanUpFunction = ()=>{
            window.removeEventListener('resize', handleResize)
        }
        return cleanUpFunction;

    }, [])
    const grandTotal = prop.items.reduce((sum, item) => sum + item.total, 0)

  return (
    <div className='bg-slate-800 font-lato px-6 pt-48 pb-20 xl:pt-20'>
        {modal && <Modal func={()=>handleDeleteInvoice(prop.id)} func2={setModal} />}
           {displayForm &&  <InvoiceFormDetails data={prop} index={id} />}

            <div className={`${displayForm ? 'fixed w-full pt-8 top-0 bg-slate-800 pointer-events-none blur-sm' : ''}`}>

                <div className='lg:max-w-[900px] lg:mx-auto'>
                    <button onClick={goBack} className='flex justify-center items-center gap-2'><FaAngleLeft className='text-indigo-500' /> <span className='font-bold'>Go Back</span></button>
                        <div className='flex justify-between items-center px-4 xl:px-14 py-8 rounded-xl bg-slate-700 my-8'>
                            <div className='flex gap-4 lg:gap-10 items-center justify-between  basis-full lg:basis-auto'>
                                <p className='text-xl font-bold text-gray-300'>Status</p>
                                <Button prop={prop.status} />
                            </div>
                            {windowWidth > 880 && <div className='flex gap-2'>
                                <Button2 func={()=>{setDisplayForm(true); console.log(prop.items)}} prop='Edit' />
                                <Button2 func={()=>setModal(!modal)} prop='Delete' />
                                {prop.status !== 'paid' && <button onClick={()=>handleStatus(prop.id, 'paid')} className={` bg-indigo-500 text-slate-50 w-36 font-bold rounded-3xl py-3 capitalize`}>Mark Paid </button>}
                            </div>}
                        </div>
                    
                    <div className='bg-slate-700 rounded-xl px-4 xl:px-14 py-8 '>
                        <div className='flex justify-between mb-6 lg:mb-12'>
                            <div>
                                <p className='font-bold'>#{prop.id}</p>
                                <p>{prop.description}</p>
                            </div>
                    
                            <ul>
                                <li className='-my-2'>
                                    <p>{prop.senderAddress.street}</p>
                                </li>
                                <li className='-my-2'>
                                    <p>{prop.senderAddress.city}</p>
                                </li>
                                <li className='-my-2'>
                                    <p>{prop.senderAddress.postCode}</p>
                                </li>
                                <li className='-mt-2'>
                                    <p>{prop.senderAddress.country}</p>
                                </li>
                            </ul>
                        </div>
                        <div className='lg:flex lg:justify-between'>
                            <div className='flex justify-between basis-1/2'>
                                <div>
                                    <p>Invoice Date</p>
                                    <p className='mb-6  font-bold'>{prop.createdAt}</p>
                                    <p>Payment Due</p>
                                    <p className='font-bold'>{prop.paymentDue}</p>
                                </div>
                                <div>
                                    <p>Bill to</p>
                                    <p className='mb-6 font-bold'>{prop.clientName}</p>
                                    <p>{prop.clientAddress.street}</p>
                                    <p className='-mt-2'>{prop.clientAddress.city}</p>
                                    <p className='-mt-2'>{prop.clientAddress.postCode}</p>
                                    <p className='-mt-2'>{prop.clientAddress.country}</p>
                                </div>
                            </div>
                            <div>
                                <p>Sent to</p>
                                <p className='font-bold'>{prop.clientEmail}</p>
                            </div>
                        </div>
                            <div className='my-8 ' >
                            <div className='flex flex-col gap-y-3 bg-slate-800 px-4 pt-8 py-14 rounded-tl-xl rounded-tr-xl'>
                                {prop.items.map((item)=> {
                                    return <div className='flex justify-between'>
                                                    <div className=''>
                                                        <p>{item.name}</p>
                                                        <p>{item.quantity} x ${item.price}</p>
                                                    </div>
                                                    <div>${item.quantity * item.price}</div>
                                                </div>
                    
                                })
                                    }
                                            </div>
                                    <div className='flex justify-between items-center bg-slate-600 px-4 pt-8 pb-12 rounded-br-xl rounded-bl-xl'>
                                        <p>Grand Total</p>
                                        <p>${grandTotal}</p>
                                   </div>
                            </div>
                    </div>
                </div>
                
            </div>
            {windowWidth <= 880 && <div className='fixed left-0 bottom-0 w-full bg-slate-700 flex justify-center gap-6 py-10'>
                    <Button2 prop='Edit' />
                    <Button2 prop='Delete' />

                    {prop.status !== 'paid' && <button onClick={()=>handleStatus(prop.id, 'paid', prop.status)} className={`${prop === 'Edit' ? 'bg-slate-50 w-24 text-slate-700' : prop === 'Delete' ? 'bg-red-500 w-24 text-slate-50' : prop === 'Mark as Paid' ? 'bg-indigo-500 text-slate-50 w-36' : ' w-36'}  font-bold rounded-3xl py-3 capitalize`}>Mark Paid </button>}

            </div>}
    </div>
  )
}

export default InvoiceDetails