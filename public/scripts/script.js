let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}


function getHabitList(form, submit){
	var list = document.getElementById("userHabitList")
	var items = list.getElementsByTagName("LI")
	var listArr = []
	
	for(var i = 0; i < items.length; i++){
		listArr.push(items[i].innerText)
	}
	
	for(var j = 0; j < listArr.length; j++){
		const arr = listArr[j].split(":")
		var habit = arr[0]
		var habitId = arr[1]
		
		var br = document.createElement("BR")
		
		var habitCheck = document.createElement("input")		
		habitCheck.type = "checkbox"
		habitCheck.name = habit
		habitCheck.value = habitId
		habitCheck.id = habit
		
		var label = document.createElement("label")
		label.htmlFor = habit
		label.appendChild(document.createTextNode(habit))
		
		var p = document.createElement("p")
		p.style.marginBottom = "3px"
		p.appendChild(habitCheck)
		p.appendChild(label)
		
		
		form.appendChild(p)
		form.appendChild(submit)
		
		
		
	}
	
	
}



function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
				cell.style.padding = 0
                //INPUT HABITS HERE
				// getHabits()
				
                var cellText = document.createElement("div")
				
				
				
				
				var habitForm = document.createElement("form")
				habitForm.setAttribute("action", "/home")
				habitForm.setAttribute("method", "post")
				
				var submit = document.createElement("input")
				submit.type = "submit"
				getHabitList(habitForm, submit)
				
				cellText.appendChild(habitForm)
			
				
				
                
				
                let cellDate = document.createElement("p")
				cellDate.style.marginBottom = "0"
				cellDate.style.textAlign = "left"
				
                let pDate = document.createTextNode(date);
				
				cellDate.appendChild(pDate)
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                
				cell.appendChild(cellDate);
				cell.appendChild(cellText)
				
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
    }
}