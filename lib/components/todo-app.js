import React from 'react';
import NewItem from './new-item'
import Item from './item'

var TodoApp = React.createClass({

    shouldComponentUpdate(newProps){
        return !this.props.world.equals(newProps.world)
    },
    render() {
        console.log('render');


        return (
            <div className="commentBox">
                This is todoapp
                <NewItem />
                {this.props.world.items.reverse().toList().map(item =>
                    <Item key={item.id} item={item} />
                )}
            </div>
        );
    }
});

export default TodoApp;
