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

function getItem(state, itemIndex) {
    console.log(itemIndex);
    return state.items[itemIndex];
    
}

// delete item
var deleteItem = function(state, item) {
    var itemId = $(item.closest('li')).attr('data-list-item-id'); 
   	state.items.splice(itemId, 1);
}

// check item
var checkItem = function(state, item) {
    var itemId = $(item.closest('li')).attr('data-list-item-id'); //itemId - dobiš ta index, ki je spodaj
    var currentItem = getItem(state, itemId);
 
    currentItem.checkedOff = true;
 
};


// un-check item

var unCheckItem = function(state, item) {
    var itemId = $(item.closest('li')).attr('data-list-item-id');
    var currentItem = getItem(state, itemId);
  //  console.log(itemID);
    currentItem.checkedOff = false; 
}

// Render functions

var renderList = function(state, element) {
    var itemsHTML = state.items.map(function(item, index) {
        if (item.checkedOff === false) {
            return '<li data-list-item-id="'+ index +'"><span class="shopping-item">'
             + item.displayName + '</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button> <button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>';
        }
        else {
            return '<li data-list-item-id="'+ index +'"><span class="shopping-item shopping-item__checked">' + item.displayName + '</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button> <button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>';
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
    console.log(this);
    renderList(state, $('.shopping-list'));

});

//strike-through

$('.shopping-list').on('click', '.shopping-item-toggle', function(event){
	event.preventDefault();
    console.log(state);
    console.log("Hello!");
    var itemId = $(this.closest('li')).attr('data-list-item-id'); //itemId - dobiš ta index, ki je spodaj
    var currentItem = getItem(state, itemId);

    if (currentItem.checkedOff === false) {
        checkItem(state, this);
    }
    else {
        unCheckItem(state, this);
    }
    
    
    renderList(state, $('.shopping-list'));
  
});








