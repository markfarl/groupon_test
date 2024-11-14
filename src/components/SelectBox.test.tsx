import { render } from '@testing-library/react'
import SelectBox from './SelectBox'

const SelectParam = {
	limit: 10,
  callback: vi.fn()
}
let container: any

describe('Dark Mode tests', () => {
  beforeEach(() => {
    container = render(<SelectBox {...SelectParam} />)
  })
  it('should Check value matches with param', () => {
    const select = container.container.querySelector(".SelectBox select")
    expect(select.value).toBe("10");
  })
  it('should Check selection calls callback', async () => {
    const select = container.container.querySelector(".SelectBox select")
    select.value = 20
    select.getElementsByTagName('option')[3].selected = 'selected'
    expect(select.value).toBe("100")
  })
})