import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Dashboard } from "./Dashboard"
import { ThemeProvider } from "@mui/material"
import { theme } from "./theme"

const queryClient = new QueryClient


export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <Dashboard />
            </ThemeProvider>
        </QueryClientProvider>
    )
}