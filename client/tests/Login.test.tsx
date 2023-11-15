import { render, screen } from "@testing-library/react"
import { store } from "../src/Store.ts"
import Login from "../src/sections/Login.tsx"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

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
