document.addEventListener('DOMContentLoaded', function () {
    const daysBox = document.getElementById('dayMonth');
    const calculateButton = document.getElementById('calculate');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayDuration = document.getElementById('period-duration');

    let selectedDate = new Date();
    
    function updateYearHeader() {
        const yearValue = document.querySelector('.year-value');
        yearValue.innerHTML = '' + selectedDate.getFullYear();  // Aggiungi il valore a una stringa vuota
    }
      
    function prevYear() {
        selectedDate.setFullYear(selectedDate.getFullYear() - 1);
        updateYearHeader();
        updateMonthHeader();
        createDayGrid(selectedDate.getFullYear(), selectedDate.getMonth());
    }    

    function nextYear() {
        selectedDate.setFullYear(selectedDate.getFullYear() + 1);
        updateYearHeader();
        updateMonthHeader();
        createDayGrid(selectedDate.getFullYear(), selectedDate.getMonth());
    }
    
    function createMonthGrid(month, year) {
        const monthGrid = document.querySelector('.main-months');
    
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
        // Itera attraverso i mesi e crea un div per ognuno
        for (let i = 0; i < months.length; i++) {
            const monthDiv = document.createElement("div");
    
            if (i === selectedDate.getMonth()) {
                monthDiv.className = "month selectable-month selected-month";
            } else {
                monthDiv.className = "month selectable-month";
            }
    
            monthDiv.textContent = months[i];
            monthGrid.appendChild(monthDiv);
        }
    
        const selectableMonths = monthGrid.querySelectorAll('.selectable-month');
        selectableMonths.forEach((month, index) => {
            month.addEventListener('click', function () {
                // Remove the 'selected-month' class from all selectable months
                const selectedMonthDiv = monthGrid.querySelector('.selected-month');
                if (selectedMonthDiv) {
                    selectedMonthDiv.classList.remove('selected-month');
                }
    
                // Add the 'selected-month' class to the clicked month
                month.classList.add('selected-month');
    
                const selectedMonth = index;
                selectedDate.setMonth(selectedMonth);
                updateMonthHeader();
                createDayGrid(selectedDate.getFullYear(), selectedDate.getMonth());
            });
        });
    }
    

    function prevMonth() {
        selectedDate.setMonth(selectedDate.getMonth() - 1);
        updateMonthHeader();
        updateYearHeader();

        createDayGrid(selectedDate.getFullYear(), selectedDate.getMonth());
    }    

    function nextMonth() {
        selectedDate.setMonth(selectedDate.getMonth() + 1);
        updateMonthHeader();
        updateYearHeader();

        createDayGrid(selectedDate.getFullYear(), selectedDate.getMonth());
    }

    function createDayGrid(year, month, duration) {
        const monthGrid = document.querySelector('.main-days');
        monthGrid.innerHTML = ''; // Svuota la griglia dei giorni
    
        const currentDate = new Date();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
    
        // Aggiungi l'intestazione dei giorni abbreviati
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let dayOfWeek of daysOfWeek) {
            const dayElement = document.createElement('div');
            dayElement.textContent = dayOfWeek;
            dayElement.classList.add('day-header');
            monthGrid.appendChild(dayElement);
        }
    
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.textContent = '';
            emptyDay.classList.add('empty-day');
            monthGrid.appendChild(emptyDay);
        }
    
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            dayElement.classList.add('selectable-day');
            dayElement.addEventListener('click', function () {
                dayClicked(year, month, i);
            });
            monthGrid.appendChild(dayElement);
        }
    
        // Highlight the current day if no date has been clicked
        if (!selectedDate) {
            const currentDay = currentDate.getDate();
            const todayElement = monthGrid.querySelector('.selectable-day:nth-child(' + (currentDay + startingDay) + ')');
            if (todayElement) {
                todayElement.classList.add('current-day');
            }
        }
    }

    function updateMonthHeader() {
        // Aggiorna l'header con il nome del mese selezionato
        daysBox.querySelector('header span').innerHTML = months[selectedDate.getMonth()] + ' ' + selectedDate.getFullYear();
    }


    function selectDate(clickedDate) {
        selectedDate = clickedDate; // Use the provided date or default to the current date
        createDayGrid(selectedDate.getFullYear(), selectedDate.getMonth());
    }
    
    // Example of how to use selectDate when a day is clicked
    function dayClicked(year, month, day) {
        const clickedDate = new Date(year, month, day);
        selectDate(clickedDate);
    }
    
    function selectDuration(){
        for (let i=1; i<61; i++){
            let option = document.createElement("option");
            option.text = i.toString();
            dayDuration.add(option);
        }
        dayDuration.value = 28;
    }

    function periodCalculate(selectedDate, duration) {
        const ovulationDay = new Date(selectedDate.getTime() + parseInt(duration) * 24 * 60 * 60 * 1000);
        console.log('Ovulation Date:', ovulationDay);
    }
     

    function init() {
        const currentYear = selectedDate.getFullYear();
        const currentMonth = selectedDate.getMonth();
        const currentDay = selectedDate.getDay();
        updateYearHeader();
        createMonthGrid(currentMonth, currentYear);
        updateMonthHeader();
        createDayGrid(selectedDate.getFullYear(), selectedDate.getMonth());
        
        dayClicked(currentYear,currentMonth,currentDay);

        document.getElementById('prevYear').addEventListener('click', prevYear);
        document.getElementById('nextYear').addEventListener('click', nextYear);
        document.getElementById('prevMonth').addEventListener('click', prevMonth);
        document.getElementById('nextMonth').addEventListener('click', nextMonth);

        selectDuration();

        document.getElementById('calculate').addEventListener('click', function () {
            periodCalculate(selectedDate, dayDuration.value);
        });

    }

    init();
});
