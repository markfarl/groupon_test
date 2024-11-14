import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'
import { MemoryRouter } from 'react-router-dom'


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

const HeaderParam = {
	callback: vi.fn() as (arg0: string) => void,
	onTypeCallback: vi.fn() as (arg0: string) => void,
}

let renderBody: RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>

describe('Header tests', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})
	beforeEach(() => {
		renderBody = render(<SearchBar {...HeaderParam} />, {
		 wrapper: ({children}) => (
			 <MemoryRouter initialEntries={["/"]}>
				 {children}
			 </MemoryRouter>
		 ),
	 });
 });

	it('should Check Search callbacks for on input change', () => {
		const searchTerm = screen.getByLabelText("searchTerm")
		fireEvent.change(searchTerm, { target: { value: "testName" } })
		expect(HeaderParam.onTypeCallback).toHaveBeenCalled()
	})
	it('should Check Search callbacks for work from Header on search click', async () => {
		const user = userEvent.setup()
		const searchTerm = screen.getByLabelText("searchTerm")
		fireEvent.change(searchTerm, { target: { value: "testName" } })
		expect(HeaderParam.callback).not.toHaveBeenCalled()

		const button = screen.getByRole("button")
		await user.click(button)

		expect(HeaderParam.callback).toHaveBeenCalled()
	})
})