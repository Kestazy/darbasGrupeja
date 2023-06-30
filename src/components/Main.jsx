import React, { useState } from 'react'

const Main = () => {
    const [filmName, setFilmName] = useState('');
    const [movies, setMovies] = useState([]);

    const getMovies = (e) => {
        //1. prevent defaault
        e.preventDefault()

        console.log(filmName)
        // 2 ar uzpildyta reiksme
        if (filmName.length < 3) {
            alert('filmo pavadinimas turi tureti nemaziau 3 simbolius')
        } else{ 
            filmSearchByName(filmName).then(response => {
                setMovies([...response])
            })
        }
        // 4. uzsetinti i nauja-kita state gauta atsakyma
    }

    // 3. fetch() i api ideti kintamaji
    const filmSearchByName = async (filmas) => {
        try {
            const result = await fetch(`https://www.omdbapi.com/?apikey=e4db3ced&s=${filmas}`);
            const data = await result.json()
            return data.Search
        } catch (error) {
            console.log(error);
        }
    }

    console.log(movies)

    return (
        <div>
            <form onSubmit={getMovies}>
                <input
                    type="text"
                    name='filmName'
                    id='filmName'
                    value={filmName}
                    onChange={(e) => setFilmName(e.target.value)}
                />
                <button>Get movie</button>
            </form>
            {
                movies.length > 0 ? movies.map((movie, index) => (
                    <div key={index}>
                        <h2>{movie.Title}</h2>
                        <h2>{movie.Year}</h2>
                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                )): <h3>nerasta</h3>
            }
        </div>
    )
}

export default Main
