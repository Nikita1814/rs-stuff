//section-vars
const ticketBtns = document.querySelectorAll('.number-btn')
const sectionTotal = document.querySelector('.total-in-section')
const types = document.querySelectorAll('.section-ticket-check')
const senTicketCount = document.querySelector('.senior-tickets')
const baseTicketCount = document.querySelector('.basic-tickets')

//Form-vars
const formTicketBtns = document.querySelectorAll('.number-btn-form')
const typeOptions = document.getElementById('TicketType')
const formBase = document.querySelectorAll('.form-basic')
const formSen = document.querySelectorAll('.form-senior')
const formBaseTotal = document.querySelector('.form-total-basic')
const formSenTotal = document.querySelector('.form-total-senior')
const formTotal = document.querySelector('.form-total-cost')


const priceList = {
permanent: 20,
temporary: 25,
combined: 40,
}


ticketBtns.forEach((el) => el.addEventListener('click', () =>{totalUpd()}))
formTicketBtns.forEach((el) => el.addEventListener('click', () =>{totalUpd()}))

function totalUpd(){    
let ticketType
types.forEach((el) => {if (el.checked) {ticketType = el.value}})
formBase.forEach((el) => el.innerText = `Basic (${priceList[ticketType]} €)`)
formSen.forEach((el) => el.innerText = `Senior (${priceList[ticketType]/2} €)`)
formBaseTotal.innerText = `${priceList[ticketType] * baseTicketCount.value} €`
formSenTotal.innerText = `${priceList[ticketType]/2 * senTicketCount.value} €`
formTotal.innerText = ` ${priceList[ticketType] * baseTicketCount.value + priceList[ticketType]/2 * senTicketCount.value} €`
sectionTotal.innerText = `Total ${priceList[ticketType] * baseTicketCount.value + priceList[ticketType]/2 * senTicketCount.value}€`
}


