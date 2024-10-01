import ReactDOM from "react-dom/client"
import App from "@/App.tsx"
import "@/index.css"
import { Provider } from "react-redux"
import { store } from "@/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MediaContextProvider } from "./MediaConfig"
import { BrowserRouter as Router } from "react-router-dom"
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <MediaContextProvider>
        <Router>
          <App />
        </Router>
      </MediaContextProvider>
    </QueryClientProvider>
  </Provider>
  // </React.StrictMode>,
)
