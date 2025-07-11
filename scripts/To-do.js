dataStorage=[{
  date:'10-7-2025',
  task:'Watch youtube'
}];


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

};

function renderPage(){

  let html ='';
  
  dataStorage.forEach((data,index)=>{
   html+=`
  <div>
    ${data.task}-${data.date}  
      <button class="js-delete"data-index="${index}">Delete</button>
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
  renderPage();
}


renderPage();

document.querySelector('.js-add').addEventListener('click',(button)=>{
  getInformation();
});

