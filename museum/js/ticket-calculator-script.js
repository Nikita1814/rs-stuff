//section-vars
const ticketBtns = document.querySelectorAll('.number-btn')
const sectionTotal = document.querySelector('.total-in-section')
const types = document.querySelectorAll('.section-ticket-check')
const senTicketCount = document.querySelectorAll('.senior-tickets')
const baseTicketCount = document.querySelectorAll('.basic-tickets')

//Form-vars

const formTicketBtns = document.querySelectorAll('.number-btn-form')
const typeOptions = document.querySelectorAll('.select-type-option')
const typeSelect = document.getElementById('TicketType')
const totalTypeName = document.querySelector('.overview-type')
const formBase = document.querySelectorAll('.form-basic')
const formSen = document.querySelectorAll('.form-senior')
const formBaseTotal = document.querySelector('.form-total-basic')
const formSenTotal = document.querySelector('.form-total-senior')
const formTotal = document.querySelector('.form-total-cost')
const formDate = document.querySelector('.date-input')
const totalDate = document.querySelector('.overview-date')
const formTime = document.querySelector('.time-input')
const totalTime = document.querySelector('.overview-time')
const options = {weekday : 'long', month: 'long', day: 'numeric'}

// Form-validation-vars

const nameImp = document.querySelector('.name-input')
const emailImp = document.querySelector('.email-input')
const telImp = document.querySelector('.tel-input')
nameImp.addEventListener("input", () =>{
    if (!nameImp.validity.valid){
        nameImp.setCustomValidity("please fill in your name (3-15 symbols including letters from cyrilic or latin alphabet and spaces)")
    } else {
        nameImp.setCustomValidity('') 
    }
})
emailImp.addEventListener("input", () =>{
    if (!emailImp.validity.valid){
        emailImp.setCustomValidity("please fill in your email in the following format : username@mail.net")
    } else {
        emailImp.setCustomValidity('') 
    }
})

telImp.addEventListener("input", () =>{
    if (!telImp.validity.valid){
        telImp.setCustomValidity("please fill in your phone number in one of the following formats:1234567890 or 123-456-78-90 or 123 456 78 90 ")
    } else {
        nameImp.setCustomValidity('') 
    }
})


let today = new Date().toISOString().split('T')[0];
formDate.setAttribute('min', today)
formTime.addEventListener('change', () => {
    totalTime.innerText = formTime.value 
})

formDate.addEventListener('change', () => {
    totalDate.innerText = new Date(formDate.value).toLocaleDateString('en-us', options)
})
const priceList = {
permanent: 20,
temporary: 25,
combined: 40,
}

types.forEach((el) => el.addEventListener('click', () =>{
  typeOptions.forEach((option) => {if (option.value === el.value) {option.selected = true}} )
  totalUpd()
}))

typeSelect.addEventListener('change' , () =>{
 types.forEach((t) => {if (t.value === typeSelect.value){t.checked = true}})
 totalUpd()   
} )

ticketBtns.forEach((el) => el.addEventListener('click', () =>{
    if(el.classList.contains('basic-minus')){
        baseTicketCount.forEach((c) => c.value--)
    }
    if(el.classList.contains('basic-plus')){
        baseTicketCount.forEach((c) => c.value++)
    }
    if(el.classList.contains('senior-minus')){
        senTicketCount.forEach((c) => c.value--)
    }
    if(el.classList.contains('senior-plus')){
        senTicketCount.forEach((c) => c.value++)
    }
    totalUpd()}))
formTicketBtns.forEach((el) => el.addEventListener('click', () =>{
    if(el.classList.contains('basic-minus')){
        baseTicketCount.forEach((c) => c.value--)
    }
    if(el.classList.contains('basic-plus')){
        baseTicketCount.forEach((c) => c.value++)
    }
    if(el.classList.contains('senior-minus')){
        senTicketCount.forEach((c) => c.value--)
    }
    if(el.classList.contains('senior-plus')){
        senTicketCount.forEach((c) => c.value++)
    }
    totalUpd()}))

function totalUpd(){    
let ticketType
let selectedEl
types.forEach((el) => {if (el.checked) {ticketType = el.value; selectedEl = el}})
formBase.forEach((el) => el.innerText = `Basic (${priceList[ticketType]} €)`)
formSen.forEach((el) => el.innerText = `Senior (${priceList[ticketType]/2} €)`)
formBaseTotal.innerText = `${priceList[ticketType] * baseTicketCount[0].value} €`
formSenTotal.innerText = `${priceList[ticketType]/2 * senTicketCount[0].value} €`
formTotal.innerText = ` ${priceList[ticketType] * baseTicketCount[0].value + priceList[ticketType]/2 * senTicketCount[0].value} €`
sectionTotal.innerText = `Total ${priceList[ticketType] * baseTicketCount[0].value + priceList[ticketType]/2 * senTicketCount[0].value}€`
totalTypeName.innerText = selectedEl.parentNode.innerText
}


