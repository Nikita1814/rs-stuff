//section-vars
const ticketBtns = document.querySelectorAll('.number-btn')
const sectionTotal = document.querySelector('.total-in-section')
const types = document.querySelectorAll('.section-ticket-check')
const senTicketCount = document.querySelectorAll('.senior-tickets')
const baseTicketCount = document.querySelectorAll('.basic-tickets')

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
types.forEach((el) => {if (el.checked) {ticketType = el.value}})
formBase.forEach((el) => el.innerText = `Basic (${priceList[ticketType]} €)`)
formSen.forEach((el) => el.innerText = `Senior (${priceList[ticketType]/2} €)`)
formBaseTotal.innerText = `${priceList[ticketType] * baseTicketCount[0].value} €`
formSenTotal.innerText = `${priceList[ticketType]/2 * senTicketCount[0].value} €`
formTotal.innerText = ` ${priceList[ticketType] * baseTicketCount[0].value + priceList[ticketType]/2 * senTicketCount[0].value} €`
sectionTotal.innerText = `Total ${priceList[ticketType] * baseTicketCount[0].value + priceList[ticketType]/2 * senTicketCount[0].value}€`
}


