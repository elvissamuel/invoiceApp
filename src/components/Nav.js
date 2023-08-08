import React from 'react'
import logo from '../assets/logo.svg'
import { FaSun } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';




const Nav = () => {
  return (
    // <div className=''> 
        <div className='flex justify-between font-lato items-center pr-4 xl:pr-0 bg-slate-700 xl:flex-col fixed w-full shadow-xl xl:h-screen xl:rounded-tr-[2rem] xl:rounded-br-[2rem] xl:w-[100px] z-20'>
            <div className='w-[90px] xl:w-full h-[90px] bg-indigo-500 flex rounded-tr-[2rem] justify-center items-center'>
                <Link to='/'><img className='w-[40px]' src={logo} alt="" /></Link>
            </div>
            <div className='flex xl:flex-col xl:pb-8 xl:gap-14 gap-10 items-center'>
                <div>
                    <FaSun className='cursor-pointer' size={25} />
                </div>
                <div>
                    <MdAccountCircle className='cursor-pointer' size={40} />
                </div>
            </div>
        </div>
    // </div>
  )
}

export default Nav