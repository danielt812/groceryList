import React, { Component } from 'react';
import Add from '../Components/Add';
import Item from '../Components/Item';
import Clear from '../Components/Clear';
import ItemAPI from '../Utils/ItemAPI';
import SettingsAPI from '../Utils/SettingsAPI';

// Sort functions
const sortByName = (a, b) => {
	return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
};

const sortByDate = (a, b) => {
	return a.date > b.date ? 1 : -1;
};

class Home extends Component {
	state = {
		loaded: false,
		sort: '',
		items: [],
		newItem: ''
	};

	componentDidMount() {
		SettingsAPI.getSettings().then((res) => {
			this.setState({ sort: res.data[0].sort }, () => {
				ItemAPI.getItems()
					.then((res) => {
						if (res.data) {
							if (this.state.sort === 'Name') {
								res.data.sort(sortByName);
							} else {
								res.data.sort(sortByDate);
							}
							this.setState({
								items: res.data,
								loaded: true
							});
						}
					})
					.catch((err) => console.log(err));
			});
		});
	}

	handleChange = (e) => {
		this.setState({ newItem: e.target.value });
	};

	activeItemHandler = (id) => {
		ItemAPI.updateActiveItem(id).then(() => {
			// Create copy of state
			const items = [...this.state.items];
			// Find index of item we want to mutate
			const index = items.findIndex((item) => {
				return item._id === id;
			});
			// Change active status to opposite value
			items[index].active = !items[index].active;
			// Set State with mutated copy
			this.setState({ items: items });
		});
	};

	clearItemsHandler = () => {
		// Http req to delete all items
		ItemAPI.deleteAllItems().then(() => {
			// Set state to empty array
			this.setState({ items: [] });
		});
	};

	addItemHandler = () => {
		// Http req to add new item
		ItemAPI.addItem({ name: this.state.newItem }).then((res) => {
			// Store new item
			let newItem = res.data;
			// Make copy of state and add new item to copy
			let items = [...this.state.items, newItem];
			// Sort copy
			if (this.state.sort === 'Name') {
				items.sort(sortByName);
			} else {
				items.sort(sortByDate);
			}
			// Set state
			this.setState({ items: items, newItem: '' });
		});
	};

	deleteItemHandler = (i, id) => {
		// Http req to delete item
		ItemAPI.deleteItem(id);
		// Make copy of state
		const items = [...this.state.items];
		// Splice copy at index
		items.splice(i, 1);
		// Set state of items
		this.setState({ items: items });
	};

	render() {
		return (
			<div className='Home'>
				<Add
					value={this.state.newItem}
					addItem={() => this.addItemHandler()}
					newItemValue={this.handleChange}
				/>
				{this.state.items && this.state.loaded
					? this.state.items.map((item, i) => {
							return (
								<Item
									key={item._id}
									id={item._id}
									name={item.name}
									deleteItem={() => this.deleteItemHandler(i, item._id)}
									setActive={() => this.activeItemHandler(item._id)}
									active={item.active}
								/>
							);
					  })
					: null}
				{this.state.items.length > 0 ? (
					<Clear clearAll={this.clearItemsHandler} />
				) : null}
			</div>
		);
	}
}

export default Home;
