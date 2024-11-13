import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import DarkMode from './DarkMode'


describe('Dark Mode tests', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should Check there are two options', () => {
    const { container } = render(<DarkMode />)
    // expect(screen.getByRole("button")).toBeInTheDocument()
    // expect(screen.getByRole("div")).toBeInTheDocument()
    // expect(screen.getByText()
    expect(container.getElementsByClassName('colorSchemeSquare').length).toBe(2);
  })
  it('should click light mode and check CSS class changes', async () => {
    const { container } = render(<DarkMode />)
    const user = userEvent.setup()
    expect(container.getElementsByClassName('colorSchemeSquare').length).toBe(2)
    await user.click(container.querySelector("colorSchemeSquare bg-black")!)

    expect(container.classList.value).toBe(1)
  })
})