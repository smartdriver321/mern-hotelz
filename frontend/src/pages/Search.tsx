import { useSearchContext } from '../context/SearchContext'

const Search = () => {
	const search = useSearchContext()
	console.log(search)

	return <div>Search</div>
}

export default Search
