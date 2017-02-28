// Single state object
var state = {
    items: []
};

// State modification functions
// add item
var addItem = function(state, item) {
    state.items.push({
        displayName: item,
        checkedOff: false
    });

}
// delete item
var deleteItem = function(state, item) {
	state.items.splice(item, 1);
}
// check item
var checkItem = function(state, item) {
    
    state.items[state.items.findIndex(x => x.displayName===item)].checkedOff = true;
 
};

/* un-check item
var unCheckItem = function(state, item) {
    item.checkedOff = false;
}*/

// Render functions
var renderList = function(state, element) {
    var itemsHTML = state.items.map(function(item) {
        if (item.checkedOff === false) {
            return '<li><span class="shopping-item">' + item.displayName + '</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button> <button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>';
        }
        else {
            return '<li><span class="shopping-item shopping-item__checked">' + item.displayName + '</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button> <button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>';
        }
    });
    element.html(itemsHTML);
};


// Event listeners
// adds item


$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val()); //state altering
    renderList(state, $('.shopping-list')); // rendering current state

    console.log(state);
});

//deletes items
$('.shopping-list').on('click', '.shopping-item-delete', function(event){
    event.preventDefault();
    console.log(state);
    deleteItem(state, this);
  //  console.log(this);
    renderList(state, $('.shopping-list'));

});

//strike-through

$('.shopping-list').on('click', '.shopping-item-toggle', function(event){
	event.preventDefault();
    console.log(state);
    console.log("Hello!")
    checkItem(state, this);
   
    renderList(state, $('.shopping-list'));
  //  $('.shopping-item').toggleClass("shopping-item__checked");
});






/*
Questions:
1. Is var addItem a function?
2. preveri, če se splo shrani kaj v state, morda
3. poglej closest();
4. is it always neccessary to have (item) in


*/