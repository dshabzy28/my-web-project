new Sortable(document.getElementById('todo-list'), {
  animation: 150,
  ghostClass: "ghost",
  handle: ".drag-handle",
  onEnd: function (evt) {
    console.log(evt.oldIndex, evt.newIndex);
  }
});
new Sortable(document.getElementById('todo-list'), {
  animation: 150,
  ghostClass: 'blue-background-class'
});