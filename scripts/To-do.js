import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

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

  const priorityElement=document.getElementById('Proirity');
  const priority=priorityElement.value;

  dataStorage.push({
    date,
    task,
    priority
  });

  console.log(priority);
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

document.querySelector('.js-show').addEventListener('click',renderPage);

console.log(typeof Sortable);//to check if the ext library is working

new Sortable(document.getElementById('todo-list'), {
  animation: 150,
  ghostClass: 'blue-background-class',
});

//left side of the page
//left side of the page
document.querySelector('.list-button')
.addEventListener('click',()=>{
  const list= document.querySelector('.list-input');
  const add = document.querySelector('.list-add');
 
  list.classList.add('list-input-2'),
  add.classList.add('list-add-2');
});

let newLists=JSON.parse(localStorage.getItem('newLists'))||[] ;
localStorage.setItem('newLists',JSON.stringify(newLists));

function renderLists(){
  let hello ='';
  newLists.forEach((list,index)=>{
  hello+=`
  <div>${list}<button class="list-delete"data-index="${index}">x</button></div>
  `});
 document.querySelector('.new-list').innerHTML=hello;

 document.querySelectorAll('.list-delete').forEach((button)=>{
  button.addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index');
    removeListData(index);
   // console.log(index);
  });
}); 
};
renderLists();

function leftGetValue(){
  const inputElement=document.querySelector('.list-input');
  const leftInput= inputElement.value;
  document.querySelector('.list-input').value='';

  newLists.push(leftInput);
  localStorage.setItem('newLists',JSON.stringify(newLists));
  renderLists();
  console.log(newLists);
};

document.querySelector('.list-add')
.addEventListener('click',function() {
  leftGetValue();
  controlAdd();
});

function removeListData(index){
  newLists.splice(index,1);
  localStorage.setItem('newLists',JSON.stringify(newLists));
  renderLists();
 };

function controlAdd(){
  const list= document.querySelector('.list-input');
  const add = document.querySelector('.list-add');

  if(list.classList.contains('list-input-2')){
    list.classList.remove('list-input-2');
  };
  if(add.classList.contains('list-add-2')){
    add.classList.remove('list-add-2');
  };
};

//right hand side
//right hand side
document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    dateClick: function (info) {
    // alert("You clicked: " + info.dateStr);
     // console.log("Date selected:", info.dateStr);
      filterTasksByDate(info.dateStr);
    }
  });
  calendar.render();
});
// just know info.dateStr is the day clicked on the calendar
let sameDate=[];

function filterTasksByDate(date) {
  sameDate = dataStorage.filter(d => d.date === date);
  if (sameDate.length > 0) {
    updateRenderPage(sameDate);
  } else {
    noTaskAvailable();
  }
  console.log(sameDate);
};

function updateRenderPage(sameDate){
    let newHtml='';
  sameDate.forEach((sameDate,index)=>{
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
      <button class="js-delete-2"data-index="${index}">Delete</button>
    </div>
  </div>
  `;
  })
    document.querySelector('.container-todo').innerHTML=newHtml;
  //review this code
   document.querySelectorAll('.js-delete-2').forEach((button) => {
    button.addEventListener('click', (e) => {
     // const index = e.target.getAttribute('data-index');
      //removeData(index);
      console.log('hello')
    });
  }); 

};
function noTaskAvailable(){
  let noTask='';
  noTask+=`
    <div class="main-todo">
    <div>NO TASK AVAILABLE</div>
    </div>
  `
  document.querySelector('.container-todo').innerHTML=noTask;
}
let dateHtml='';
function setAdate(){
  const today = dayjs();
  const day=today.format('MMM D')
  const hour =today.hour();
  let greeting='';

  if(hour>=0 &&hour<=12){
   greeting='Good Morning'
  }else if (hour>=12 && hour<=17) {
    greeting='Good Afternoon'
  } else if (hour>=18 && hour<=21){
    greeting='Good Evening'
  }else if (hour>=21 && hour<=23){
    greeting='Good Night'
  };
// is should be on render page
  dateHtml=`
  <div>${day}</div>
  <div class=display-time>
    <div>${greeting}</div>
   <div> What's your plan for today?</div>
  </div>
  `
  document.querySelector('.content-header').innerHTML=dateHtml;
}
setAdate();
//sort tasks by prioriy

let sortDate=[];
document.querySelector('.js-high').addEventListener('click',()=>{filterTasksByPriority('High')})
document.querySelector('.js-mid').addEventListener('click',()=>{filterTasksByPriority('Mid')})
document.querySelector('.js-low').addEventListener('click',()=>{filterTasksByPriority('Low')})

function filterTasksByPriority(value) {
  sortDate = dataStorage.filter(p => p.priority === value);
  if (sortDate.length > 0) {
   renderSorting(sortDate)
  } else {
    noTaskAvailable();
  }
  console.log(sortDate);
};
function renderSorting(sortDate){
    let sortHtml='';
  sortDate.forEach((sortDate,index)=>{
    sortHtml+=`
    <div class="main-todo">
    <div>		
    <label class="custom-checkbox">
    <input type="checkbox">
    <span class="checkmark"></span>
    </label>
      ${sortDate.task}</div>
    <div>${sortDate.date}</div> 
    <div class="delete-button">
      <button class="js-delete-2"data-index="${index}">Delete</button>
    </div>
  </div>
  `;
  })
  document.querySelector('.container-todo').innerHTML=sortHtml;
};
