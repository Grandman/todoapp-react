import 'bootstrap/css/bootstrap.css!';

import React from 'react';

import TodoApp from 'lib/components/todo-app';
import worldAtom from './world/atom';
import {CreateItem} from './item/transitions';
import diff from 'immutablediff'

function render(world){
    React.render(<TodoApp world={world} />, document.getElementById('todo'));
}

//worldAtom.addWatch('render', (key, ref, oldW, newW) => render(newW));
//worldAtom.addWatch('log', (key, ref, oldW, newW) => console.log(diff(oldW, newW).toString()));


//let oldWorld = worldAtom.deref();
//function log(){
//    console.log(diff(oldWorld, worldAtom.deref()).toString());
//    oldWorld = worldAtom.deref();
//    setTimeout(log, 5000);
//}
//log();

function renderByTimer(){
    render(worldAtom.deref());
    setTimeout(renderByTimer, 20);
}
renderByTimer();

render(worldAtom.deref());

function addItem(){
    worldAtom.swap(CreateItem, {text: Math.random().toString()});
    //setTimeout(addItem, 10);
}
addItem();
addItem();
addItem();