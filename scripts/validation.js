
const form = document.querySelector('.popup__form-edit-profile')
const formInput = form.querySelector('.popup__form-input')


console.log(form)
console.log(formInput)

function showInputError (formElement, inputElement, errorMessege) {
const errorElttment = formElement.querySelector(`${inputElement.id}-error`)
inputElement.classList.add('popup__form-input_error');
errorElttment.textContent = errorMessege ;
errorElttment.classList.add('popup__span-input-error')
}





















