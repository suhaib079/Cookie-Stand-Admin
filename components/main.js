import React, {useState} from "react";
import "tailwindcss/tailwind.css"

export default function CookieStandForm(){
const [store, setStore] = useState('')
    
    function createHandler(event){
        event.preventDefault();
        let store = {
            location: event.target.location.value,
            min: event.target.min.value,
            max: event.target.max.value,
            ave: event.target.ave.value,
        }
        setStore(store)
    }



    return (
        <main className = "grid w-full p-10 px-0 text-center bg-green-100 justify-items-stretch">
        <form onSubmit = {CookieStandForm} className = "px-10 py-5 mx-12 bg-green-300 rounded w-4/5justify-self-center">
            <h2 className = "p-5 text-2xl">
                Create Cookie Stand
            </h2>
            <div>
                <label className = "w-5/6">
                    Location
                </label>
                <input type = "text" placeholder="Cookie Stand Location"/>
            </div>
            <div>
                <label className = "inline-block m-3">
                    Minimum Customers Per Hour
                    </label>
                <input type = "number"/>

                <label className = "inline-block m-3">
                    Maximum Customers Per Hour
                    </label>
                <input type = "number"/>

                <label className = "inline-block m-3">
                    Average Cookies per Sale
                    </label>
                    <input  type="number"/>

                <button className = "p-8 py-5 m-3 bg-green-400" type = "submit">Create</button>
                    
            </div>
        </form>
        <section className="text=center p-10">
        <p className='m-5 text-gray-600'>Report Table coming soon .....</p>
        <p className="m-3">{JSON.stringify(store)}</p>
        </section>
        </main>
    )
}