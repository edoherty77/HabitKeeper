let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");



let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
$(window).on("load", showCalendar(currentMonth, currentYear))


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    $(window).on("load", showCalendar(currentMonth, currentYear))
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    $(window).on("load", showCalendar(currentMonth, currentYear))
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    $(window).on("load", showCalendar(currentMonth, currentYear))
}

function edit(editBtn){
	
}



function getHabitList(date, submit, form, editBtn){
	var list = document.getElementById("userHabitList")
	var items = list.getElementsByTagName("LI")
	var listArr = []
	
	
	//LOOP THROUGH LIST OF HABITS AND PUSH INTO ARRAY
	for(var i = 0; i < items.length; i++){
		listArr.push(items[i].innerText)
	}
	
	
	//LOOP THROUGH ARRAY OF OBJECTS AND ASSIGN VARIABLES
	for(var j = 0; j < listArr.length; j++){
		const arr = listArr[j].split(":")
		var habit = arr[0]
		var habitId = arr[1]
		
		
		
		var br = document.createElement("BR")
		
		var habitCheck = document.createElement("input")
		
	
		//REMOVE SPACES BEFORE/AFTER TEXT IN STRING
		var habitStr = habit.trim()
		var habitIdStr = habitId.trim()
		
		
		
		habitCheck.className = "form-check-input"
		habitCheck.type = "checkbox"
		habitCheck.name = habitStr
		habitCheck.value = date
		habitCheck.id = habitStr
	
		
		if(habitCheck.value < today.getDate()){
			habitCheck.disabled = true
		}
		
		
		
		var label = document.createElement("label")
		label.className = "form-check-label"
		label.htmlFor = habitStr
		label.appendChild(document.createTextNode(habitStr))
		
		var p = document.createElement("p")
		p.style.fontFamily = "Boogaloo"
		p.style.fontSize = "17.5px"
		p.style.marginBottom = "3px"
		p.className = "form-check"
		
		
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
				cell.className = "cell"
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
				//EXTRACTING USER ID FROM EJS FILE
				var userId = document.getElementById("userId").innerText
				
				
                let cell = document.createElement("td");
				cell.style.padding = 0
                
                var cellText = document.createElement("div")
				
				var habitForm = document.createElement("form")
				habitForm.setAttribute("action", "/home/" + userId )
				habitForm.setAttribute("method", "post")
				habitForm.setAttribute("class", "formClass")
				
				var editBtn = document.createElement("button")
				editBtn.className = "btn btn-lg"
				editBtn.id = "editBtn"
				editBtn.innerHTML = "Edit"
				
				
			
				
				var editDiv = document.createElement("div")
				editDiv.appendChild(editBtn)
				
				var submit = document.createElement("button")
				submit.type = "submit"
				submit.className = "btn btn-sm"
				submit.innerHTML = "Submit"
				submit.style.fontFamily = "Boogaloo"
				submit.style.color = "rgb(80, 191, 182)"
				
				
				getHabitList(date, submit, habitForm, editBtn)
				
				
				
				cellText.appendChild(habitForm)
				cellText.appendChild(editDiv)
			
                
				
                let cellDate = document.createElement("p")
				cellDate.style.marginBottom = "0"
				cellDate.style.textAlign = "left"
				cellDate.style.color = "rgb(80, 191, 182)"
				cellDate.style.fontFamily = "Boogaloo"
                let pDate = document.createTextNode(date);
				
				
				cellDate.appendChild(pDate)
				
				// COLOR TODAYS DATE
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.style.background = "rgb(80, 191, 182)";
					cellDate.style.color = "black"
					cellDate.style.fontFamily = "Boogaloo"
					submit.style.color = "black"
					editBtn.style.display = "none"
				
					//DISABLE PREVIOUS DAYS AND ADD EDIT BUTTON
                } else if(parseInt(date) < today.getDate() && year === today.getFullYear() && month === today.getMonth()){
					cell.style.background ="gray"
					submit.disabled = true 
					submit.style.color = "gray"
					submit.style.pointerEvents = "none"
					
					
					
					
				                

					
					
				} else if(parseInt(date) > today.getDate() && year === today.getFullYear() && month === today.getMonth()){
					// cell.style.pointerEvents = "none"
					editBtn.style.display = "none"
				}
				
				


				
				cell.appendChild(cellDate);
				cell.appendChild(cellText)
				
                row.appendChild(cell);
                date++;
				
				
				
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
    }
}




