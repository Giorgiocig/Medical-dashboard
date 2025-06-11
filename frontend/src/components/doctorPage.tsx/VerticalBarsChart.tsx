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
import { Box } from '@mui/material'

import { graphData, graphOptions } from '../../utilities/helpers'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function VerticalBarChart({
    text,
    sampleData,
}: {
    text: string
    sampleData: { [key: string]: number }
}) {
    let xAxisLabels: string[] = []
    let dataValues: number[] = []

    for (const [key, value] of Object.entries(sampleData)) {
        xAxisLabels.push(key)
        dataValues.push(value)
    }

    const data = graphData(xAxisLabels, dataValues)
    const options = graphOptions(text)

    return (
        <Box style={{ width: '500px' }}>
            <Bar data={data} options={options} />
        </Box>
    )
}
