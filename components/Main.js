import { useState } from 'react'
import { hours } from "../data"



export default function Main(props) {

    const [location,setLocation] = useState("");
    const [min,setMin] = useState("");
    const [max,setMax] = useState("");
    const [avg,setAvg] = useState("");
    const [report,setReport] = useState("");
    const [sum,setSum] = useState("")

    function locHandler(event){
        setLocation(event.target.value);
    }
    function minHandler(event){
        setMin(event.target.value);
    }
    function maxHandler(event){
        setMax(event.target.value);
    }
    function avgHandler(event){
        setAvg(event.target.value);
    }

    function onCreate(event){
        event.preventDefault();
        const result = []
        const data = {
            id:report.length + 1,
            location:location,
            cookies:[]
        }

        for (let i = 0; i < 14; i++){
            let sum = Math.floor(Math.random() * ((parseInt(max) - parseInt(min) + 1) ) + parseInt(min))
            data.cookies.push(sum)
            for(let j = 0; j < report.length+1; j++){
                sum += report[j] ? report[j].cookies[i] : 0
            }
            result.push(sum)
        }

        setReport(
            [...report,data]
        )
        setSum(
            result
        )
        props.setBranches(
            report.length + 1
        )
      }

    return (
        <main className="grid w-full p-10 px-0 text-center bg-green-100 justify-items-stretch">
            <form className="px-10 py-5 mx-12 bg-green-300 rounded w-4/5justify-self-center" onSubmit={onCreate}>
                <fieldset>

                    <div className="flex flex-col ...">
                        <div className="p-5 text-2xl">
                                 <h2 >Create Cookie Stand</h2>
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
                                    <input onChange={minHandler} type="number" name="min" />
                                </div>
                                <div className="flex flex-col ... w-1/4 text-xs text-center bg-green-100 p-2 rounded-lg">
                                    <label >Maximum Customers per Hour</label>
                                    <input onChange={maxHandler} type="number" name="max" />
                                </div>
                                <div className="flex flex-col ... w-1/4 text-xs text-center bg-green-100 p-2 rounded-lg">
                                    <label >Average Cookies per Sale</label>
                                    <input onChange={avgHandler} type="number" step="0.01" name="avg" />
                                </div>
                                <button className="bg-green-500 w-1/4 rounded-lg">Create</button>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
            
            <div className="flex flex-col ... text-center ... mb-8 ... container mx-auto w-4/5">
                {(report.length == 0) ? 
                <h2>No Cookie Stands Available</h2> :
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
                    <tbody className="border-collapse border border-black-900">
                        {report.map(data => (
                            <tr className="border-collapse border border-black-600" key={data.id}>
                                <td className="border-collapse border border-black-700">{data.location}</td>
                                {data.cookies.map(cookie => (<td className="border-collapse border border-gray-700">{cookie}</td>))}
                                <td className="border-collapse border border-gray-700">{data.cookies.reduce((acc, curr) => {acc = acc+curr; return acc},0)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="border-collapse border border-gray-900 bg-green-700">
                        <tr className="border-collapse border border-gray-850" key={report.length + 1}>
                            <th className="border-collapse border border-gray-700">total</th>
                            {sum.map(sum => (<th className="border-collapse border border-gray-900">{sum}</th>))}
                            <th className="border-collapse border border-gray-900">{sum.reduce((acc, curr) => {acc = acc+curr; return acc},0)}</th>
                        </tr>
                    </tfoot>
                </table>
                }  
            </div>
        </main>
    )
}

/// help with suhaib khrwasih