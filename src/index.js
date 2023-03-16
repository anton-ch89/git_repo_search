'use strict'

const form = document.querySelector('.form');
const formInput = document.querySelector('.form__input');
const formButton = document.querySelector('.form__button');
const repoField = document.querySelector('.repo__field')
const repoBlock = document.querySelector('.repo__block')
const nothing = document.querySelector('.nothing');
const mistake = document.querySelector('.mistake');
const errorDiv = document.querySelector('.error');




async function getData(string) {
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${string}+in:name&per_page=10`)
        let data = await response.json()
        if (data.items.length) {
            repoField.innerHTML = ''
            data.items.forEach(item => {
                let date = item.created_at.split('T').join(' ').slice(0, -1)
                repoField.insertAdjacentHTML('beforeend', `
                            <div class='repo__block'>
                            <h2 class='repo__header'><a class='repo__link' href='${item.html_url}'>${item.name}</a></h2> 
                            <img class='repo__img' height='50' width='50' src='${item.owner.avatar_url}' alt='avatar'>
                            <p class='repo__owner'>Автор: <a class='repo__link' href='${item.owner.html_url}'><em>${item.owner.login}</em></a></p > 
                            <p class='repo__date'>Дата создания: <em>${date}</em></p>
                            </div >
                            `)

            });
            nothing.hidden = true
        } else {
            nothing.hidden = false
            repoField.innerHTML = ''
        }

    } catch (error) {
        errorDiv.hidden = false
        console.log(error);
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    getValidation()
})

function getValidation() {
    const inputReg = /^.{1,30}$/
    if (!inputReg.test(formInput.value.trim())) {
        mistake.hidden = false
    } else {
        getData(formInput.value);
        formInput.value = ''
    }

    formInput.addEventListener('input', (event) => {
        mistake.hidden = true
    })
}



