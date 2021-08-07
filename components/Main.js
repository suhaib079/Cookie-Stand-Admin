import { useEffect, useState } from 'react'
import { hours } from "../data"
import axios from 'axios'

export default function Main(props) {

    const baseURL = " https://azeez-cookies.herokuapp.com/"
    const token = "api/token/"
    const apiData = "api/v1/cookies/"

    async function getToken(username,password){
        const url = baseURL+token
        const response = axios.post(url,{
            username,
            password
        })
        return response
    }

    async function getData(){
        const response = await getToken(props.username,props.password)
        const {access:token,refresh} = response.data
        const url = baseURL+apiData
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        return axios.get(url,config)
    }

    async function save_data(data){
        const response = await getToken(props.username,props.password)
        const {access:token,refresh} = response.data
        const url = baseURL+apiData
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(url,data,config)
    }

    async function delete_data(id){
        const response = await getToken(props.username,props.password)
        const {access:token,refresh} = response.data
        const url = baseURL+apiData+id
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        return axios.delete(url,config)
    }
    
    const [location,setLocation] = useState("");
    const [minCustPerHr,setMinCustPerHr] = useState("");
    const [maxCustPerHr,setMaxCustPerHr] = useState("");
    const [avgCookie,setAvgCookie] = useState("");
    const [report,setReport] = useState([]);
    const [summation,setSummation] = useState([])
    const [status,setStatus] = useState("No Cookie Stands Available")
    const [reportStatus,setReportStatus] = useState(false)
    
    function calSummation(report){
        let cummulative = 0
        const result = []
        for (let i = 0; i < 14; i++){
            for(let j = 0; j < report.length; j++){
                cummulative += report[j].hourly_sales[i];
            }
            result.push(cummulative)
            cummulative = 0
        }
        setSummation(
            result
        )
    }

    useEffect(async ()=>{
        const response = await getData()
        const {data} = response
        setReport(data)
        if (data.length > 0){
            calSummation(data)
            props.setBranches(
                data.length
            )
        }
    },[reportStatus])

    useEffect(async ()=>{
        const response = await getData()
        const {data} = response
        setReport(data)
        if (data.length > 0){
            calSummation(data)
            props.setBranches(
                data.length
            )
        }
    },[])

    function locHandler(event){
        setLocation(event.target.value);
    }
    function minHandler(event){
        setMinCustPerHr(event.target.value);
    }
    function maxHandler(event){
        setMaxCustPerHr(event.target.value);
    }
    function avgHandler(event){
        setAvgCookie(event.target.value);
    }

    function deleteRow(event){
        event.preventDefault();
        setReport([])
        setStatus("Deleting a row")
        async function handler(id){
            const response = await delete_data(id)
            if (response.status == 204){
                const getResponse = await getData()
                const {data} = getResponse
                if (data.length >= 0){
                    setReportStatus(!reportStatus)
                    if (data.length == 0){
                        setStatus("No Cookie Stands Available")
                    }
                }
            }
        }
        handler(event.target.id)
    }

    function onCreate(event){
        event.preventDefault();
        let custmer;
        let cookie;
        const result = []
        const data = {
            location:location,
            owner:"1",
            description:"good branch",
            hourly_sales:[],
            minimum_customers_per_hour:minCustPerHr,
            maximum_customers_per_hour:maxCustPerHr,
            average_cookies_per_sale:avgCookie
        }
        for (let i = 0; i < 14; i++){
            let rand  = Math.random()
            let sum = rand*(parseInt(maxCustPerHr)-parseInt(minCustPerHr)+1) 
            sum += parseInt(minCustPerHr)
            custmer = Math.floor(parseInt(sum))
            cookie = custmer*parseFloat(avgCookie)
            data.hourly_sales.push(Math.floor(cookie))
        }
        save_data(data)
        setReport([])
        setReportStatus(!reportStatus)
        setStatus("New Row in a Pending State")
      }

    return (
        <main className="container mx-auto">
            <form className="container mx-auto w-4/5 bg-green-300 pb-8 ... mb-8 ... pt-8 ... rounded-lg ..." onSubmit={onCreate}>
                <fieldset>
                    <div className="flex flex-col ...">
                        <div className="text-center ... text-xl my-1.5 pb-4">
                            {props.title}
                        </div>
                        <div>
                            <div className="container mx-auto w-11/12 my-1.5" >
                                <label className="mr-8 ..." >location</label>
                                <input onChange={locHandler} className="w-4/5" type="text" name="location" />
                            </div>
                        </div>
                        <div className="container mx-auto w-11/12 my-1.5" >
                            <div className="flex space-x-6 ...">
                                <div className="flex flex-col ... w-1/4 text-xs text-center bg-green-100 p-2 rounded-lg">
                                    <label >Minimum Customers per Hour</label>
                                    <input onChange={minHandler} type="number" name="minCustPerHr" />
                                </div>
                                <div className="flex flex-col ... w-1/4 text-xs text-center bg-green-100 p-2 rounded-lg">
                                    <label >Maximum Customers per Hour</label>
                                    <input onChange={maxHandler} type="number" name="maxCustPerHr" />
                                </div>
                                <div className="flex flex-col ... w-1/4 text-xs text-center bg-green-100 p-2 rounded-lg">
                                    <label >Average hourly_sales per Sale</label>
                                    <input onChange={avgHandler} type="number" step="0.01" name="avgCookie" />
                                </div>
                                <button className="bg-green-500 w-1/4 rounded-lg">Create</button>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
            <div className="flex flex-col ... text-center ... mb-8 ... container mx-auto w-4/5">
                {(report.length == 0) ? 
                <h2>{status}</h2> :
                <table className="border-collapse border border-gray-900 rounded-lg">
                    <thead className="bg-green-500">
                        <tr key="0">
                            <th>
                                Location
                            </th>
                            {hours.map(hour => (<th>{hour}</th>))}
                            <th>
                                Totals
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border-collapse border border-gray-900">
                        {report.map(data => (
                            <tr className="border-collapse border border-gray-900" key={data.id}>
                                <td className="border-collapse border border-gray-900">
                                    <div className="flex justify-between">
                                        <div className="pl-2">
                                            {data.location}
                                        </div>
                                        <div className="pr-2">
                                            <button onClick={deleteRow} ><svg id={data.id} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path id={data.id} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg></button>
                                        </div>
                                    </div>
                                </td>
                                {data.hourly_sales.map(cookie => (<td className="border-collapse border border-gray-900">{cookie}</td>))}
                                <td className="border-collapse border border-gray-900">{data.hourly_sales.reduce((acc, curr) => {acc = acc+curr; return acc},0)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="border-collapse border border-gray-900 bg-green-500">
                        <tr className="border-collapse border border-gray-900" key={report.length + 1}>
                            <th className="border-collapse border border-gray-900">Totals</th>
                            {summation.map(sum => (<th className="border-collapse border border-gray-900">{sum}</th>))}
                            <th className="border-collapse border border-gray-900">{summation.reduce((acc, curr) => {acc = acc+curr; return acc},0)}</th>
                        </tr>
                    </tfoot>
                </table>
                }  
            </div>
        </main>
    )
}