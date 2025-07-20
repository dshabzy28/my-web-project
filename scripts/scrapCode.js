new Sortable(document.getElementById('todo-list'), {
  animation: 150,
  ghostClass: "ghost",
  handle: ".drag-handle",
  onEnd: function (evt) {
    console.log(evt.oldIndex, evt.newIndex);
  }
});


let sameDate=[];

function filterTasksByDate(date){
  dataStorage.forEach((dates)=>{
    if (date===dates.date) {
    sameDate=dates ,updateRenderPage(sameDate)
    } else if(date !==dates.date){
      noTaskAvailable()
    }
  });
  
  console.log(sameDate);
}