import React, { Component } from 'react';
import TodoItems from './Todoitems';
import '../style/todo.css';
import Homeslider from './Homeslider';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };
            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });


            this._inputElement.value = "";
        }
        e.preventDefault();
    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });

        this.setState({
            items: filteredItems
        });
    }


    render() {

        if (this.state.items.length) {
            var tostore = JSON.stringify(this.state.items);
            console.log(tostore);
            localStorage.setItem('storage', tostore);
        }
        var stored = localStorage.getItem("storage");
        console.log('stored' + stored);
        if (stored) {
            //Items are stored in local storage
            this.state.items = JSON.parse(stored);
        }
        console.log(this.state.items.length);

        return (
            <>
                <Homeslider />
                <h1 className="uk-heading-line uk-text-center"><span>Wörterzettel</span></h1>
                <div className="todoListMain">
                    <div className="header">
                        <form onSubmit={this.addItem}>
                            <input ref={(a) => this._inputElement = a}
                                placeholder="Ein Wort hinzufügen">
                            </input>
                            <button type="submit">hinzufügen</button>
                        </form>
                    </div>
                    <TodoItems entries={this.state.items} delete={this.deleteItem} />
                </div>
            </>
        );
    }
}
export default Todo;