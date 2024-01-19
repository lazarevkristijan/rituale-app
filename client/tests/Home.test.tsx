import { render, screen } from "@testing-library/react"
import { store } from "../src/Store"
import { Home } from "../src/sections"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

test("renders top header", () => {
  render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  )
  const header = screen.getByRole("heading", { level: 1 })
  expect(header).toBeInTheDocument()
})
