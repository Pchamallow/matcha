import "./searchResultsList.css"





export const SearchResultsList = ({results}) => {

	return (
		<div className='results_list'>
			{results.map((result, id) => {
				return <div key={id}> {result.username} </div>;
			}
			)}
		</div>
	);
}

export default SearchResultsList;
