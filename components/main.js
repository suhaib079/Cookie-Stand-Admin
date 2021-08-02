import Head from 'next/head'
import { useState } from 'react'

export default function Home() {

  const [store,setStore] = useState('');

  function handler(e){
    e.preventDefault();

    let store = {
      location: e.target.location.value,
      min: e.target.min.value,
      max: e.target.max.value,
      avg: e.target.avg.value,
    }
    setStore(store)
  }
  
  return (
    <div >
      <Head>
        <title>Cookie Stand Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='p-5 bg-green-400'>
        <h1 className='text-4xl' >Cookie Stand Admin</h1>
      </header>


      <main className='grid w-full p-10 px-0 text-center bg-green-200 justify-items-stretch'>
        <h1 className = "p-5 text-2xl">Create Cookie Stand</h1>
      
      <form onSubmit = {handler}>
        <label for='loc' className = "inline-block m-3" >Location</label>
        <input name="location" type='text'></input>
        <label className = "inline-block m-3" for='loc'>Minimum Customers Per Hour</label>
        <input name="min" type='number'></input>
        <label for='loc' className = "inline-block m-3">Maximum Customers Per Hour</label>
        <input name="max" type='number'></input>
        <label for='loc' className = "inline-block m-3">Average Cookies per Sale</label>
        <input name="avg" type='number'></input>
        <button className = "p-8 py-5 m-3 bg-green-500" type = "submit">Create</button>

        <p className='m-5 text-gray-800'>Report Table coming soon .....</p>
        <p className="m-3">{JSON.stringify(store)}</p>

        
        
        
      </form>




      </main>  

      <footer className='p-3 bg-green-400'>

      &copy;2021  

      </footer>
    </div>
  )
}