import { render, screen } from "@testing-library/react"
// import { QueryClient, QueryClientProvider } from "react-query"
import { store } from "../Store.ts"
import Login from "./Login.tsx"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
// const queryClient = new QueryClient()

test("Renders h1", () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  )
  const header = screen.getByRole("heading", { level: 3 })
  expect(header).toBeInTheDocument()
})
