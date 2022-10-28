import { Bar, Line } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto"
let opt = {
    scales: {
        y: {
            title: {
                display: true,
                text:"[Reps] * Weight",
                color:"black",
                font : {
                    size:15
                }
            },
            grid: {
                color:"rgba(255,255,255,0.9)"
            }
        },
        x: {
            title: {
                display: true,
                text:"Date",
                color:"black",
                font : {
                    size:15
                }
            },
            grid: {
                color:"rgba(255,255,255,0.9)"
            }
        }
    }
}
function LineChart({chartData}) {
    return <Line data = {chartData} options={opt} />
}

export default LineChart