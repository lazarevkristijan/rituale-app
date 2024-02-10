import { render, screen } from "@testing-library/react"
import { store } from "../src/Store"
import { General } from "../src/sections"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

test("Renders top heading", () => {
  render(
    <Provider store={store}>
      <Router>
        <General />
      </Router>
    </Provider>
  )
  const header = screen.getByRole("heading", { level: 2 })
  expect(header).toBeInTheDocument()
})
