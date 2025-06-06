import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'
import type { IDoctor } from '../../utilities/interfaces'
import { Box } from '@mui/material'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function VerticalBarChart({ sampleData }: { sampleData: any }) {
    let xAxisLabels: string[] = []
    let dataValues: any = []

    for (const [key, value] of Object.entries(sampleData)) {
        xAxisLabels.push(key)
        dataValues.push(value)
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Specialities',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    }

    const data = {
        labels: xAxisLabels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(199, 199, 199, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                ],
                borderWidth: 1,

            },
        ],
    }

    return (
        <Box style={{ width: '600px', height: '400px' }}>
            <Bar data={data} options={options} />
        </Box>
    )
}
