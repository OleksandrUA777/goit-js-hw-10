import Notiflix from 'notiflix';

export {fetchCountries}

function fetchCountries(name){
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages,area
    `)
    .then(response =>{
        //  console.log('від від беку: ',response)
     if(!response.ok){
      Notiflix.Notify.failure('"Oops, there is no country with that name"')
        throw new Error(response.statusText)
      }
    return response.json()
    })
}