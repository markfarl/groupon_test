import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DarkMode from './DarkMode'

describe('Dark Mode tests', () => {
  it('should Check there are two options', () => {
    const { container } = render(<DarkMode />)
    expect(container.getElementsByClassName('colorSchemeSquare').length).toBe(2);
  })
  it('should click light mode and check CSS class changes', async () => {
    const { container } = render(<DarkMode />)
    const user = userEvent.setup()
    const elements = container.getElementsByClassName('colorSchemeSquare')
    expect(elements.length).toBe(2)

    await user.click(elements[1]!)
    expect(elements[1].classList.contains("border-border-line")).toBe(true)
    expect(elements[0].classList.contains("border-border-line")).toBe(false)

    // CLick again and expect oppisite to be true
    await user.click(elements[1]!)
    expect(elements[1].classList.contains("border-border-line")).toBe(false)
    expect(elements[0].classList.contains("border-border-line")).toBe(true)
  })
  it('should click dark mode and <body> class changes', async () => {
    const { container } = render(<DarkMode />)
    const user = userEvent.setup()
    const elements = container.getElementsByClassName('colorSchemeSquare')
    expect(elements.length).toBe(2)
    await user.click(elements[1]!)
    expect(document.body.classList.contains("dark")).toBe(true)
  })
})