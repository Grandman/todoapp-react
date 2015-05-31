import Item from './record';

let counter = 0;
function CreateItem(oldWorld, attrs) {
    let itemAttrs = Object.assign({}, attrs, {id: counter++});
    let item = new Item(itemAttrs);
    return oldWorld.setIn(['items', item.id], item);
}
function DeleteItem(oldWorld, item){
    return oldWorld.deleteIn(['items', item.id]);
}

export {CreateItem, DeleteItem};
