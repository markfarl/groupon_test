import { SERVER_URL } from "@/constants/api"
import { GetSearchResults, ReturnSearchResults } from "@/types/SearchResults";

class SearchWiki {
	url: string;
	constructor(url: string) {
		this.url = url
	}

	async getSearchResult({ term, limit = 10 }: GetSearchResults): Promise<ReturnSearchResults> {
		const url = `${this.url}&searchTerm=${term}&limit=${limit}`
		const response = await fetch(url);
		if (!response.ok) {
			console.error(`Response status: ${response.status}`);
		}

		const results = await response.json();
		return {
			limit,
			term,
			total: results.length,
			results
		}
	}

}

export default new SearchWiki(SERVER_URL)