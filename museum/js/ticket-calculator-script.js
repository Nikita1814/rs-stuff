const ticketBtns = document.querySelectorAll('.number-btn')
const sectionTotal = document.querySelector('.total-in-section')
const types = document.querySelectorAll('.section-ticket-check')
const senTicketCount = document.querySelector('.senior-tickets')
const baseTicketCount = document.querySelector('.basic-tickets')
 
const priceList = {
permanent: 20,
temporary: 25,
combined: 40,
}


ticketBtns.forEach((el) => el.addEventListener('click', () =>{totalUpd()}))

function totalUpd(){
let ticketType
types.forEach((el) => {if (el.checked) {ticketType = el.value}})
sectionTotal.innerText = `Total €${priceList[ticketType] * baseTicketCount.value + priceList[ticketType] * (senTicketCount.value/2)}`
}


