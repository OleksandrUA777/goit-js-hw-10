import './css/styles.css';
import { fetchCountries } from './fetchCountries'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.getElementById('search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info')
}

refs.input.addEventListener('input',debounce(inputChangeHandler,DEBOUNCE_DELAY))

function inputChangeHandler(event){
    clearData()
     const input = event.target.value 

     const fixedInput = input.trim()
             
    if(fixedInput === ''){
                clearData()
      return 
    }
    fetchCountries(fixedInput).then(countries => {
        // console.log('розпаршена дата, країни: ',countries)

        countries.map(({flags,languages,name,capital,population} ) =>{           
            if(countries.length >= 2 && countries.length <= 10){
                const markup = `<li class='country-list__item'><img src="${flags.svg}" alt="${name.common}" width ='20'><span>${name.common}<span></li>`
                
                refs.list.insertAdjacentHTML('beforeend',markup)
                
            } else if(countries.length === 1){
                refs.list.innerHTML = ''

let languagesArray = []
let languagesList = ''
    for(const key in languages){
    const language = languages[key]

    languagesArray.push(language)

    languagesList = String(languagesArray)
    
    }
           const markup =  `<div class="heading">
                <img src="${flags.svg}" alt="${name.common}" width ='35'><h1 class="country-info__name">${name.common}</h1>
              </div>
                <ul class="country-info__list">
                <li class="country-info__item"><span class="span-bold">Capital: </span>${capital}</li>
                <li class="country-info__item"><span class="span-bold">Population: </span>${population}</li>
                <li class="country-info__item"><span class="span-bold">Languages: </span>${languagesList}</li>
                
              </ul>`
              
                refs.info.insertAdjacentHTML('beforeend',markup)
                
            }
        })

        if(countries.length > 10){
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
    }
    }).catch(error => console.log(error))

}
function clearData(){
    refs.list.innerHTML = ''
    refs.info.innerHTML = ''
}