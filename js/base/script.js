const showFilmList = (selector, name) => {
	selector.innerHTML += `
        <div>
            <h2>Title : ${name}</h2>
        </div>
    `
}

const emptyFilmList = () => {
	result.innerHTML = ``
}

const result = document.getElementById('result');

let userquery = document.getElementById('searchbar');

const apikey = '';//fill your own api key

document.querySelector('#searchbar').addEventListener('keypress', function(e) {

	let url = `http://www.omdbapi.com/?i=&s=${userquery.value}&apikey=${apikey}`;

	if (e.key === 'Enter') {
		emptyFilmList();
		fetch(url).then(response =>
			response.json().then(data => {
				if (data.Response == "True") {
					data.Search.forEach(film => showFilmList(result, film.Title));
				}
				if (data.Response == "False") {
					result.innerHTML = `No film listed`
				}
			}));
	}
});