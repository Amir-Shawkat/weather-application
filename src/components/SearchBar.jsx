
export default function SearchBar({city, setCity, onSearch}) {
    return(
        <div className="search">
            <input 
            type="text"
            placeholder="Enter a City name please..."
            value={city}
            spellCheck="false"
            onChange={(e) => setCity(e.target.value)}

            onKeyDown={(e) => {
                if(e.key === "Enter"){
                    onSearch();
                }
            }}
            />

            <button onClick={onSearch}>
                <img src="/images/search.png" alt="search" />
            </button>
        </div>
    );
}