import { useState } from 'react'

export default function Login({submit}){

    const [name,setName] = useState("") 
    const [pass,setPass] = useState("")

    function changeName(event){
        setName(event.target.value)
    }

    function changePassword(event){
        setPass(event.target.value)
    }

    function login(){
        submit(name,pass)
    }

    return (
        <div className="w-full flex justify-center pt-3 ">
            <form className="px-8 pt-6 pb-8 mb-4 bg-green-200 rounded shadow-md " >
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" >
                        name
                    </label>
                    <input name="name" className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="name" onChange={changeName}/>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-700" >
                        Password
                    </label>
                    <input name="pass" className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="pass" type="pass" placeholder="******************" onChange={changePassword}/>
                </div>
                <div className="flex items-center justify-center">
                    <button onClick={login}  className="px-4 py-2 font-bold text-white bg-green-700 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}