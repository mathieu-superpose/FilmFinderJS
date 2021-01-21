const apikey = '285cd719';//fill your own api key
const result = document.getElementById('result');
let userquery = document.getElementById('searchbar');


// ------ Film search and display -------


document.querySelector('#searchbar').addEventListener('keypress', function(e) {

	let url = `http://www.omdbapi.com/?i=&s=${userquery.value}&apikey=${apikey}`;

	if (e.key === 'Enter') {
		emptyFilmList();
		loadFilmList(url);
	}
});

const loadFilmList = (url) => {
	fetch(url).then(response =>
			response.json().then(data => {
				if (data.Response == "True") {
					data.Search.forEach(film => showFilmList(result, film.Title, film.imdbID));
					console.log(document.getElementsByClassName('readmorebutton'));

					console.log(document.getElementsByClassName('imglogo')[0]);

					document.getElementsByClassName('imglogo')[0].addEventListener('clic', () => {
					console.log('coucou');
					});
				}
				if (data.Response == "False") {
					result.innerHTML = `No film listed`
				}
			}));

}

const showFilmList = (selector, name, id) => {
	selector.innerHTML += `
        <div>
            <h2>Title : ${name}</h2>
            <button onclick="loadModal('${id}')" class="location-btn" data-toggle="modal" data-target="#movieModal">Readmore</button>
        </div>
    `
}

const emptyFilmList = () => {
	result.innerHTML = ``
}


// ------- Modal -------


const loadModal = (id) => {
  let mod = `http://www.omdbapi.com/?i=${id}&apikey=${apikey}`;
  fetch(mod)
    .then((response) => response.json())
    .then((data) => openModal(data))
    .catch((error) => console.error(`error: ${error}`))
}

// Update the modal innerHTML with new informations
const openModal = (movie) => {
  let modal = document.getElementById('myModal');
  console.log(movie);
      let image = movie['Poster'];
      if(image == "N/A") image = "../img/base/placeholder.jpg";
  modal.innerHTML =`
  <div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
    <span onclick="closeModal()" class="close">&times;</span>
    	<img src=${image}>
        <p>${movie.Title}</p>
    </div>
  </div>
  `;
  modal.style.display = "block";
}

const closeModal = (modal) => {
	const mymodal = document.getElementById('myModal');
	mymodal.style.display = "none";
}