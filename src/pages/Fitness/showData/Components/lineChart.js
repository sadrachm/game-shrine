import { Bar, Line } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto"


function LineChart({chartData, exercise}) { 
    let opt = {
        plugins: {
            legend: {
                display:false
            },
            title: {
                display: true,
                text:exercise,
            }
        },    
        layout: {
            padding: {
                right:20,
                bottom:10,
                left:5,
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text:"[Reps] * Weight",
                    color:"rgb(0,0,0)",
                },
                grid: {
                    color:"black",
                    lineWidth:.2
                }
            },
            x: {
                border: {
                    display:true,
                    color:"black",
                },
                title: {
                    display: false,
                    text:"Date",
                    color:"black",
                },
                grid: {
                    color:"black",
                    lineWidth:.2
                },
                reverse: true
            },
    
        }
    }
    return <Line className="graphBackground" data = {chartData} options={opt} />
}

export default LineChart