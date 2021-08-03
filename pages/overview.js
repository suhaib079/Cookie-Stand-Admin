import Head from '../components/Head'
import Header from '../components/Header'
import { useState } from 'react'

export default function Overview() {
    const [title,setTitle] = useState('Overview');
    const [path,setPath] = useState("/")
    const [page,setPage] = useState("Cookie Stand Admin")

    return (
        <div className="bg-green-100">
          <Head title={title}/>
          <Header header={title} path={path} page={page}/>
        </div>
      )
}