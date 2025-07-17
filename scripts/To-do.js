export let dataStorage= JSON.parse(localStorage.getItem('dataStorage')) || [{
  date:'2025-7-10',
  task:'Watch youtube',
  priority:'high'
}];
localStorage.setItem('dataStorage',JSON.stringify(dataStorage));

function getInformation(){
  const dateElement =document.querySelector('.js-input-date');
  const date =dateElement.value;
  
  const taskElement= document.querySelector('.js-input');
  const task = taskElement.value;

  dataStorage.push({
    date,
    task,

  });

  renderPage();

  document.querySelector('.js-input').value='';
  document.querySelector('.js-input-date').value='';

  localStorage.setItem('dataStorage',JSON.stringify(dataStorage));

};

function renderPage(){
  let html ='';
  
  dataStorage.forEach((data,index)=>{
   html+=`
   <div class="main-todo">
      <div>		
      <label class="custom-checkbox">
      <input type="checkbox">
      <span class="checkmark"></span>
      </label>
       ${data.task}</div>
      <div>${data.date}</div> 
      <div class="delete-button">
        <button class="js-delete"data-index="${index}">Delete</button>
      </div>
    </div>
  `;
  });
  document.querySelector('.container-todo').innerHTML=html;

  document.querySelectorAll('.js-delete').forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      removeData(index);
    });
  }); 
};

function removeData(index) {
  dataStorage.splice(index, 1);
  localStorage.setItem('dataStorage',JSON.stringify(dataStorage));
  renderPage();
}

renderPage();

document.querySelector('.js-add').addEventListener('click',(button)=>{
  getInformation();
});

console.log(typeof Sortable);//to check if the ext library is working

new Sortable(document.getElementById('todo-list'), {
  animation: 150,
  ghostClass: 'blue-background-class',
});

//left side of the page
document.querySelector('.list-button')
.addEventListener('click',(button)=>{
  document.querySelector('.list-input')
  .classList.add('list-input-2'),
   document.querySelector('.list-add')
  .classList.add('list-add-2')
});

let newLists=JSON.parse(localStorage.getItem('newlists')) || [];

localStorage.setItem('newLists',JSON.stringify(newLists));
let hello ='';

function renderLists(){
  newLists.forEach((list)=>{
  hello+=`
  <div>${list}</div>
  `});
  localStorage.setItem('newLists',JSON.stringify(newLists));
  document.querySelector('.new-list').innerHTML=hello;
};

function leftGetValue(){
  const inputElement=document.querySelector('.list-input');
  const leftInput= inputElement.value;

  newLists.push(leftInput);

  document.querySelector('.list-input').value='';
  renderLists(newLists);
  console.log(leftInput)
  console.log(newLists)
}
renderLists(newLists);

document.querySelector('.list-add')
.addEventListener('click',()=>{
  leftGetValue()
});

//right hand side
document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    dateClick: function (info) {
    // alert("You clicked: " + info.dateStr);
      console.log("Date selected:", info.dateStr);
      
      filterTasksByDate(info.dateStr);
    }
  });
  calendar.render();
});

// just know info.dateStr is the day clickesd on the calendar
let sameDate='';

function filterTasksByDate(date){
  dataStorage.forEach((dates)=>{
    if (date===dates.date) {
    sameDate=dates
    }
  });
  console.log(sameDate);
  updateRenderPage(sameDate);
}
function updateRenderPage(sameDate,index){
  let newHtml='';
  newHtml+=`
    <div class="main-todo">
    <div>		
    <label class="custom-checkbox">
    <input type="checkbox">
    <span class="checkmark"></span>
    </label>
      ${sameDate.task}</div>
    <div>${sameDate.date}</div> 
    <div class="delete-button">
      <button class="js-delete"data-index="${index}">Delete</button>
    </div>
  </div>
  `;
  document.querySelector('.container-todo').innerHTML=newHtml;
}