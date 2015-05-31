import 'bootstrap/css/bootstrap.css!';

import React from 'react';

import TodoApp from 'lib/components/todo-app';
import worldAtom from './world/atom';
import {CreateItem} from './item/transitions';

function render(world){
    React.render(<TodoApp world={world} />, document.body);
}


worldAtom.addWatch('render', (key, ref, oldW, newW) => render(newW));
//worldAtom.addWatch('log', (key, ref, oldW, newW) => console.log(newW.toString()));

render(worldAtom.deref());

function addItem(){

    worldAtom.swap(CreateItem, {text: Math.random().toString()});

    setTimeout(addItem, 10);
}
addItem();