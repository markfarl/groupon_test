import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from './Search'
import { MemoryRouter } from 'react-router-dom'
import useDebounce from '@/hooks/useDebounce'
import searchWiki from "@/libs/SearchWiki"

vi.mock('@/contexts/SearchNavContext', () => ({
	useSearchNav: () => {
		return {
			setSearchNavData: vi.fn(),
			searchNavData: {
				searchTerm: "Test"
			}
		}
	}
}))

vi.mock("@/hooks/useDebounce",  { spy: true })
vi.mock("@/libs/SearchWiki",  { spy: true })

describe('Search Page tests', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})
	beforeEach(() => {
		render(<Search />, {
			wrapper: ({ children }) => (
				<MemoryRouter initialEntries={["/"]}>
					{children}
				</MemoryRouter>
			),
		});
	})
	it('should Check that api calls are made via debounce after input change', () => {
		const searchTerm = screen.getByLabelText("searchTerm")
		fireEvent.change(searchTerm, { target: { value: "test Search" } })
		expect(useDebounce).toBeCalled()
	})
	it('should Check that calls to api are made after submit', async () => {
		const user = userEvent.setup()
		const searchTerm = screen.getByLabelText("searchTerm")
		fireEvent.change(searchTerm, { target: { value: "test Seaddrch" } })
		const button = screen.getByRole("button")
		await user.click(button)

		expect(searchWiki.getSearchResult).toHaveBeenCalledTimes(1)
		
	})
})