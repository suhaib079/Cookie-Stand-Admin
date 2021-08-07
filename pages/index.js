import Head from '../components/Head'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import Form from '../components/Form.js'
import { useState } from 'react'


export default function Home() {

  const [title,setTitle] = useState('Cookie Stand Admin');
  const [branches,setBranches] = useState('0')
  const [path,setPath] = useState("/overview")
  const [page,setPage] = useState("overview")
  const [name,setName] = useState('raneem')
  const [savedPass,setsavedPass] = useState('1963')
  const [logged,setLogged] = useState(false)

  function submit(username,password){
    if (name == username && password == savedPass){
      console.log(name ,savedPass)
      setLogged(true);
    }
    console.log(logged)
  }
if (logged){
  return (
    <div className="bg-green-100">
    <Head title={title}/>
    <Header header={title} path={path} page={page} username={name}/>
    <Main title={title} setBranches={setBranches} username={name} password={pass}/>
    <Footer branches={branches} />
    </div>

  )

}
else{
  return (
    <Form submit={submit}/>
  )

}
  
}