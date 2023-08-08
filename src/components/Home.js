import React, { useContext, useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa';
import plusIcon from '../assets/icon-plus.svg'
import data from '../data-demo.json'
import InvoiceCard from './InvoiceCard';
import { Link } from 'react-router-dom';
import InvoiceForm from './InvoiceForm';
import { InvoiceContext } from '../InvoiceContext';


const Home = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [showFilter, setShowFilter] = useState(false)
    const {displayForm, setDisplayForm, invoiceArray, setInvoiceArray} = useContext(InvoiceContext)
    // const [paidChecked, setPaidChecked] = useState(false)
    // const [pendingChecked, setPendingChecked] = useState(false)
    // const [draftChecked, draftPaidChecked] = useState(false)
    // const [filteredData, setFilteredData] = useState()
    const [selectedFilter, setSelectedFilter] = useState([])
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
    const handleSelectedFilter = (e) => {
        const value = e.target.value;
        const checked = e.target.checked
        if(checked){
            setSelectedFilter([...selectedFilter, value])
        } else{
            setSelectedFilter(selectedFilter.filter((filter) => filter !== value))
        }
    }
    // const filterInvoice = (status)=>{
    //     const filteredData = data.filter((card)=> status === card.status)
    //     setFilteredData(filteredData)
        
    // }
    const filteredData = invoiceArray.filter((item) =>
        selectedFilter.includes(item.status)
    )
    const myData = selectedFilter.length !== 0 ? filteredData : invoiceArray;
  return (
    <div className="bg-slate-800 h-screen">
        <div className='bg-slate-800 font-lato pb-8 pt-24 xl:pt-0 '>
           {displayForm &&  <InvoiceForm />}
            <div className={`${displayForm ? 'fixed w-full pt-8 top-0 bg-slate-800 pointer-events-none blur-sm' : ''}`}>
                <div className='flex justify-between items-center px-4 py-8 lg:max-w-[900px] lg:mx-auto'>
                    <div>
                        <p className='text-3xl lg:text-4xl font-extrabold'>Invoice</p>
                    </div>
                    <div className='flex gap-4 lg:gap-12 items-center relative'>
                        {showFilter && 
                        <div className='absolute z-10 text-base pl-6 flex flex-col gap-2 justify-center w-32 h-36 shadow-md shadow-slate-600 top-14 left-4 rounded-lg bg-slate-700 '>
                            <div>
                                <input type="checkbox" checked={selectedFilter.includes('paid')} name="" value='paid' onChange={handleSelectedFilter} id="paid" />
                                <label htmlFor="paid"> Paid</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={selectedFilter.includes('pending')} name="" id="pending" onChange={handleSelectedFilter} value='pending' />
                                <label htmlFor="pending"> Pending</label>
                            </div><div>
                                <input type="checkbox" checked={selectedFilter.includes('draft')} name="" onChange={handleSelectedFilter} value='draft' id="draft" />
                                <label htmlFor="draft"> Draft</label>
                            </div>
                        </div>}
                        <div>
                            <span>Filter {windowWidth >= 620 && <span>By Status</span>} <FaAngleDown onClick={()=>setShowFilter(!showFilter)} className='text-indigo-500 inline cursor-pointer' /> </span>
                        </div>
                        <button onClick={()=>setDisplayForm(true)} className='bg-indigo-500 flex gap-2 p-3 rounded-3xl'><div className='bg-slate-50 w-7 h-7 rounded-[50%] flex justify-center items-center'><img src={plusIcon} alt="" /></div> <span className='text-base'>New</span> {windowWidth >= 620 && <span className={`text-base`}> Invoice</span>}</button>
                    </div>
                </div>
                {myData.map((card, index) =>{
                    return(
                    <InvoiceCard prop={card} index={index} />
                    )
        
                })}
            </div>
        </div>
    </div>
  )
}

export default Home