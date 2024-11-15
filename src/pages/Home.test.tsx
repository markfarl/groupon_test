import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './Home'
import { MemoryRouter } from 'react-router-dom'
import { useSearchNav } from '@/contexts/SearchNavContext'
import { Mock } from 'vitest'


vi.mock(import('@/contexts/SearchNavContext'), () => {
	let _cache: { setSearchNavData: Mock<(...args: any[]) => any>; searchNavData: { searchTerm: string; history: never[]; limit: number } }
	const useSearchNav = () => {
		if (!_cache) {
			_cache = {
				setSearchNavData: vi.fn(),
				searchNavData: {
					searchTerm: "Test",
					history: [],
					limit: 10
				}
			}
		}
		// now every time that useObject() is called it will
		// return the same object reference
		return _cache
	}
	return { useSearchNav }
})
let container: any

describe('Home Page tests', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})
	beforeEach(() => {
		container = render(<Home />, {
			wrapper: ({ children }) => (
				<MemoryRouter initialEntries={["/"]}>
					{children}
				</MemoryRouter>
			),
		});
	})
	it('should Check that calls to Search context after submit', async () => {
		const user = userEvent.setup()
		const searchNav = useSearchNav()
		const searchTerm = screen.getByLabelText<HTMLInputElement>("searchTerm")
		const button = screen.getByRole("button")
		await user.click(button)
		expect(searchTerm.value).toBe("Test")
		expect(searchNav.setSearchNavData).toHaveBeenCalledTimes(1)
	})
	it('should expect elements rendered: logo', () => {
		const logo = screen.getByAltText("image logo")
		expect(logo).toBeInTheDocument()
	})
	it('should expect elements rendered: searchBar', () => {
		const searchbar = container.container.querySelector(".SearchBar")
		expect(searchbar).toBeInTheDocument()
	})
	it('should expect elements rendered: darkMode', () => {
		const darkmode = container.container.querySelector(".DarkMode")
		expect(darkmode).toBeInTheDocument()
	})
})