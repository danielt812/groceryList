import React, { Component } from 'react';
import Add from './Components/Add';
import Item from './Components/Item';
import api from '../src/Utils/api';
import './App.css';

class App extends Component {
	state = {
		loaded: false,
		newItem: ''
	};

	componentDidMount() {
		api
			.getItems()
			.then((res) => {
				if (res.data) {
					this.setState({
						items: res.data,
						loaded: true
					});
				}
			})
			.catch((err) => console.log(err));
	}

	handleChange = (e) => {
		this.setState({ newItem: e.target.value });
	};

	addItemHandler = () => {
		api.addItem({ name: this.state.newItem }).then(() =>
			api.getItems().then((res) => {
				this.setState({ items: res.data, newItem: '' });
			})
		);
		// const items = [...this.state.items];
	};

	deleteItemHandler = (index, id) => {
		api.deleteItem(id);
		const items = [...this.state.items];
		items.splice(index, 1);
		this.setState({ items: items });
	};

	render() {
		return (
			<div className='App'>
				<h1>Grocery List</h1>
				<Add
					value={this.state.newItem}
					addItem={() => this.addItemHandler()}
					newItemValue={this.handleChange}
				/>
				{this.state.items && this.state.loaded
					? this.state.items.map((item, i) => {
							return (
								<Item
									key={i}
									id={item._id}
									name={item.name}
									deleteItem={() => this.deleteItemHandler(i, item._id)}
								/>
							);
					  })
					: null}
			</div>
		);
	}
}

export default App;
