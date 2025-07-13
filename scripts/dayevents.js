
console.log(typeof Sortable);

new Sortable(document.getElementById('main'), {
    animation: 150,
    swap:false,
    ghostClass: 'blue-background-class'
});
