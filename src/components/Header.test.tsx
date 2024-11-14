import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'
import { Dispatch, SetStateAction } from 'react'
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
	typeCallback: vi.fn() as Dispatch<SetStateAction<string>>,
}

let renderBody: RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>

describe('Header tests', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})
	beforeEach(() => {
		renderBody = render(<Header {...HeaderParam} />, {
		 wrapper: ({children}) => (
			 <MemoryRouter initialEntries={["/"]}>
				 {children}
			 </MemoryRouter>
		 ),
	 });
 });

	it('should Check Search callbacks for on input change call from Header', () => {
		//render(<MemoryRouter><Header {...HeaderParam} /></MemoryRouter>)
		const searchTerm = screen.getByLabelText("searchTerm")
		fireEvent.change(searchTerm, { target: { value: "testName" } })

		expect(HeaderParam.typeCallback).toHaveBeenCalled()
	})
	it('should Check Search callbacks for work from Header on search click', async () => {
		//render(<MemoryRouter><Header {...HeaderParam} /></MemoryRouter>)
		const user = userEvent.setup()
		const searchTerm = screen.getByLabelText("searchTerm")
		fireEvent.change(searchTerm, { target: { value: "testName" } })
		expect(HeaderParam.callback).not.toHaveBeenCalled()

		const button = screen.getByRole("button")
		await user.click(button)

		expect(HeaderParam.callback).toHaveBeenCalled()
	})
	it('should Check logo', async () => {
		const image = renderBody.getByAltText("image logo")
		expect(image).toBeInTheDocument()
	})
})

