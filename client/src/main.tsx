import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import { store } from "./Store.ts"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()
console.log("Main rendering")
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)

console.log("after main rendering")
