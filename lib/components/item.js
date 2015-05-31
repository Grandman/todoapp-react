import React from 'react';
import rb from 'react-bootstrap';
import world from '../world/atom';
import {DeleteItem} from '../item/transitions';

var Item = React.createClass({

    shouldComponentUpdate(newProps){
        return !this.props.item.equals(newProps.item)
    },


    handleSubmit(){
        world.swap(DeleteItem, this.props.item);
    },
    render() {
        //console.log(this.props.item.toString());

        return (
            <rb.Grid>
                <rb.Row className='show-grid'>
                    <rb.Col xs={11} md={11}>
                        {this.props.item.text}
                    </rb.Col>
                    <rb.Col xs={1} md={1}>
                        <rb.Button onClick={this.handleSubmit} block>
                            <rb.Glyphicon glyph='remove' />
                        </rb.Button>
                    </rb.Col>
                </rb.Row>
            </rb.Grid>
        );
    }
});

export default Item;
