let dataStorage= JSON.parse(localStorage.getItem('dataStorage')) || [{
  date:'2025-7-10',
  task:'Watch youtube'
}];
localStorage.setItem('dataStorage',JSON.stringify(dataStorage));

function getInformation(){
  const dateElement =document.querySelector('.js-input-date');
  const date =dateElement.value;
  
  const taskElement= document.querySelector('.js-input');
  const task = taskElement.value;

  dataStorage.push({
    date,
    task
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
  <div>
   <div class="main-todo"> ${data.task}-${data.date}  
      <button class="js-delete"data-index="${index}">Delete</button>
    </div>
  </div>
  `;
  });
  document.querySelector('.js-paragraph').innerHTML=html;

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
  ghostClass: 'blue-background-class'
});

