import { render, screen } from "@testing-library/react"
import Home from "@mui/icons-material/Home"

describe("App tests", () => {
  test("renders a h1", () => {
    render(<Home />)
    const header = screen.getByRole("heading", { level: 1 })
    expect(header).toBeInTheDocument()
  })
})
