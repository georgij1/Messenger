let calendar = document.querySelector('.calendar')

const month_names = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {
    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')
    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    calendar_days.innerHTML = ''
    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()
    month_picker.innerHTML = `${month_names[month]}`
    let date = new Date()
    console.log(date.getMonth())
    console.log(month_names[date.getMonth()])
    let div = document.querySelector('.month-list')
    console.log(div.children[0].children[0].textContent)
    console.log(div.children[1].children[0].textContent)
    console.log(div.children[2].children[0].textContent)
    console.log(div.children[3].children[0].textContent)
    console.log(div.children[4].children[0].textContent)
    console.log(div.children[5].children[0].textContent)
    console.log(div.children[6].children[0].textContent)
    console.log(div.children[7].children[0].textContent)
    console.log(div.children[8].children[0].textContent)
    console.log(div.children[9].children[0].textContent)
    console.log(div.children[10].children[0].textContent)
    console.log(div.children[11].children[0].textContent)
    if (month_names[date.getMonth()]) {
        console.log('this month')
        month_picker.innerHTML=`${month_names[date.getMonth()]}`
    }
    calendar_header_year.innerHTML = year
    let first_day = new Date(year, month, 1)
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('grid')
        calendar_footer.classList.remove('none')
        calendar_body.classList.remove('none')
        calendar_header.classList.remove('none')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')
let calendar_footer = document.querySelector('.calendar-footer')
let calendar_body = document.querySelector('.calendar-body')
let calendar_header = document.querySelector('.calendar-header')

month_picker.onclick = () => {
    month_list.classList.add('grid')
    calendar_footer.classList.add('none')
    calendar_body.classList.add('none')
    calendar_header.classList.add('none')
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}