import React, { Component } from 'react';
import Add from './Components/Add';
import Item from './Components/Item';
import Nav from './Components/Nav';
import Clear from './Components/Clear';
import api from '../src/Utils/api';
import './App.css';

class App extends Component {
	state = {
		loaded: false,
		items: [],
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

	clearItemsHandler = () => {
		api.deleteAllItems().then(() => {
			api.getItems().then(() => {
				this.setState({
					items: []
				});
			});
		});
	};

	addItemHandler = () => {
		api.addItem({ name: this.state.newItem }).then(() =>
			api.getItems().then((res) => {
				this.setState({ items: res.data, newItem: '' });
			})
		);
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
				<Nav />
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
				<Clear clearAll={this.clearItemsHandler} />
			</div>
		);
	}
}

export default App;
