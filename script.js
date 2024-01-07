document.addEventListener('DOMContentLoaded', function () {
    const daysBox = document.getElementById('dayMonth');
    const calculateButton = document.getElementById('calculate');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayDuration = document.getElementById('period-duration');

    let selectedDate = new Date();
    
    function createYearGrid() {
        const yearGrid = document.querySelector('.main-months');
//        yearGrid.innerHTML = renderMonths();
    
        const selectableMonths = yearGrid.querySelectorAll('.selectable-month');
        selectableMonths.forEach((month, index) => {
            month.addEventListener('click', function () {
                const selectedMonth = index;
                selectedDate.setMonth(selectedMonth);
                updateMonthHeader();
                createDayGrid(selectedDate.getFullYear(), selectedDate.getMonth());
            });
        });
   
        // Inizializza l'header dell'anno
        updateYearHeader();
    }
    
    function updateYearHeader() {
        const yearValue = document.querySelector('.year-value');
        yearValue.innerHTML = '' + selectedDate.getFullYear();  // Aggiungi il valore a una stringa vuota
    }
      
    function prevYear() {
        selectedDate.setFullYear(selectedDate.getFullYear() - 1);
        updateYearHeader();
//        createYearGrid();
        createDayGrid(selectedDate.getFullYear(), selectedDate.getMonth());
    }    

    function nextYear() {
        selectedDate.setFullYear(selectedDate.getFullYear() + 1);
        updateYearHeader();
//        createYearGrid();
        createDayGrid(selectedDate.getFullYear(), selectedDate.getMonth());
    }


    function createMonthGrid(month, year) {
        const monthGrid = document.querySelector('.main-months');
    
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
  
        // Itera attraverso i mesi e crea un div per ognuno
        for (let i = 0; i < months.length; i++) {
          const monthDiv = document.createElement("div");
          monthDiv.className = "month selectable-month";
          monthDiv.textContent = months[i];
          monthGrid.appendChild(monthDiv);
        }
    
        const selectableMonths = monthGrid.querySelectorAll('.selectable-month');
        selectableMonths.forEach((month, index) => {
            month.addEventListener('click', function () {
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
//        createYearGrid();
        createDayGrid(selectedDate.getFullYear(), selectedDate.getMonth());
    }    

    function nextMonth() {
        selectedDate.setMonth(selectedDate.getMonth() + 1);
        updateMonthHeader();
//        createYearGrid();
        createDayGrid(selectedDate.getFullYear(), selectedDate.getMonth());
    }

    function createDayGrid(year, month, duration) {
        const monthGrid = document.querySelector('.main-days');
        monthGrid.innerHTML = ''; // Svuota la griglia dei giorni
    
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
                selectDate(new Date(year, month, i));
            });
            monthGrid.appendChild(dayElement);
        }
    }
    
    function selectDate(date) {
        selectedDate = date;
        createDayGrid(selectedDate.getFullYear(), selectedDate.getMonth());
    }
    
    function updateMonthHeader() {
        // Aggiorna l'header con il nome del mese selezionato
        daysBox.querySelector('header span').innerHTML = months[selectedDate.getMonth()];
    }
    
    function selectDuration(){
        for (let i=1; i<61; i++){
            let option = document.createElement("option");
            option.text = i.toString();
            dayDuration.add(option);
        }
        dayDuration.value = 28;
    }

/*    function updateDuration() {
        const durationInput = document.getElementById('durationInput'); // Assumendo che 'durationInput' sia l'id del tuo campo di input
        const date = new Date(); // Supponiamo che tu voglia ottenere la data corrente

        durationInput.value = 28; // Imposta il valore predefinito a 28

        durationInput.addEventListener('click', function () {
            const duration = parseInt(durationInput.value) || 28;
            const datePeriod = date.getDay() + duration; // Nota la correzione di date.getDay() per ottenere il giorno corrente
            console.log(datePeriod);
        });

    }
*/
    function init() {
        const currentYear = selectedDate.getFullYear();
        const currentMonth = selectedDate.getMonth();
        
        createYearGrid();
        createMonthGrid(currentMonth, currentYear);
        updateMonthHeader();
        createDayGrid(selectedDate.getFullYear(), selectedDate.getMonth());
        
        document.getElementById('prevYear').addEventListener('click', prevYear);
        document.getElementById('nextYear').addEventListener('click', nextYear);
        document.getElementById('prevMonth').addEventListener('click', prevMonth);
        document.getElementById('nextMonth').addEventListener('click', nextMonth);

        selectDuration();
//        calculateButton.addEventListener('click', updateDuration);

    }

    init();
});
