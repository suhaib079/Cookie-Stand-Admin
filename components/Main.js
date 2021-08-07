import { useState } from 'react';
import { useEffect } from 'react';
import { working_time } from '../data.js'
import { If, Else, Then } from 'react-if';

export default function Main(props) {

    const [allData, setAllData] = useState(props.dataAPI);
    const [totaloftotal, settotaloftotal] = useState(props.totaloftotal);
    const [totalperhour, setTotalperhour] = useState(props.totalperhour);
    
    useEffect(()=>{
        
        setAllData(props.dataAPI)
        setTotalperhour(props.totalperhour)
        settotaloftotal(props.totaloftotal)
        
    },[props.dataAPI,props.totalperhour,props.totaloftotal])
    
    function onCreate(event) {

        event.preventDefault()
        
        props.senumberoflocaton(props.numberoflocaton+1)

        const storeData = {
            location: event.target.location.value,
            minCustomers: event.target.min.value,
            maxCustomers: event.target.max.value,
            avgCookies: event.target.avg.value,
        }
        const data = {
            location: storeData.location,
            hourly_sales: hr_sales_cal(storeData.minCustomers, storeData.maxCustomers, storeData.avgCookies),

        }
        data.totalperday = cal_total_per_day(data.hourly_sales)
        function hr_sales_cal(min, max, avg) {
            let arr = []
            working_time.forEach((d, i) => {

                const randmonCookiessale = Math.floor((Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min)) * parseInt(avg))
                arr.push(randmonCookiessale)

            });
            let newTotalperhour = arr.map((d, i) => {
                return d + totalperhour[i]
            })
            setTotalperhour(newTotalperhour)
            return arr
        }

        function cal_total_per_day(arr) {
            let total = 0
            arr.forEach(item => {
                total += item
            })
            return total
        }

        let TotalofTotals=totaloftotal+data.totalperday

        
        settotaloftotal(TotalofTotals)

        setAllData([...allData, data]);
        
    }
    return (
        <main className="min-h-750">

            <CreateForm onCreate={onCreate} />

            <ReportTable allData={allData} working_time={working_time} totalperhour={totalperhour} totaloftotal={totaloftotal} />
            

        </main>
    );
}


function CreateForm(props) {

    return (
        <form className="flex-col w-3/4 p-2 mx-auto my-40 bg-green-300 rounded-md " onSubmit={props.onCreate}>
            <h1 className='my-3 text-2xl text-center'>Create Cookie Stand</h1>
            <div className="flex " >
                <label className="mx-1" >Location</label>
                <input name="location" className="flex-auto bg-gray-100 " />
            </div>
            <div className="flex w-3.2/4 mx-auto my-5">
                <div className="flex-col w-1/4">
                    <h2>Minimum Customers per hour</h2>
                    <input type='number' name="min" className="" />
                </div>
                <div className="flex-col w-1/4">
                    <h2>Maximum Customers per hour</h2>
                    <input type='number' name="max" className="" />
                </div>
                <div className="flex-col w-1/4">
                    <h2>Average Cookies per Sale</h2>
                    <input type='number' name="avg" className="" />
                </div>
                <button className="w-1/4 bg-green-500 ">Create</button>
            </div>
        </form>

    );

}

function ReportTable(props) {

    return (


        <div className="container flex flex-col w-3/4 mx-auto mb-20 text-center">
            <If condition={props.allData.length == 0}>
                <Then>
                    <h2>No Cookie Stands Available</h2>
                </Then>
                <Else>
                    <table className="border border-collapse border-gray-900 rounded-md">
                        <thead className="bg-green-500">

                            <th>Location</th>
                            {props.working_time.map(item => {
                                return (<th >{item}</th>)
                            })}
                            <th >Totals</th>


                        </thead>
                        
                        <tbody className="border border-collapse border-gray-900">
                            {props.allData.map(item => {
                                return (
                                    <tr className="border border-collapse border-gray-900">
                                        <td className="border border-collapse border-gray-900" >{item.location}</td>
                                        {item.hourly_sales.map(item => {
                                            return (
                                                <td className="border border-collapse border-gray-900" >{item}</td>
                                            )

                                        })}

                                        <td className="border border-collapse border-gray-900" >{item.totalperday}</td>
                                    </tr>


                                )

                            })}

                        </tbody>
                        <tfoot className="bg-green-500 border border-collapse border-gray-900">
                            <tr className="border border-collapse border-gray-900" >
                                <th className="border border-collapse border-gray-900">Totals</th>
                                {props.totalperhour.map(item => {
                                    return (
                                        <td className="border border-collapse border-gray-900">{item}</td>
                                    )
                                })}
                                <td className="border border-collapse border-gray-900">{props.totaloftotal}</td>
                            </tr>
                        </tfoot>
                    </table>

                </Else>
            </If>

        </div>


    );
}


///// help with suhaib khrosh