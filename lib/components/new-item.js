import React from 'react';
import rb from 'react-bootstrap';
import world from '../world/atom';
import {CreateItem} from '../item/transitions';

var NewItem = React.createClass({
    getInitialState(){
        return { text: '' };
    },
    handleChange(e){
        this.setState({text: e.target.value});
    },
    handleSubmit(){
        world.swap(CreateItem, {text: this.state.text});
    },
    render() {
        return (
            <rb.Grid>
                <rb.Row className='show-grid'>
                    <rb.Col xs={11} md={11}>
                        <rb.Input
                            type='text'
                            onChange={this.handleChange}
                            value={this.state.text}
                        />
                    </rb.Col>
                    <rb.Col xs={1} md={1}>
                        <rb.Button onClick={this.handleSubmit} block>
                            <rb.Glyphicon glyph='ok' />
                        </rb.Button>
                    </rb.Col>
                </rb.Row>
            </rb.Grid>
        );
    }
});

export default NewItem;
