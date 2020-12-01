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
							console.log(this.state);
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
			ItemAPI.getItems().then((res) => {
				if (this.state.sort === 'Name') {
					res.data.sort(sortByName);
				} else {
					res.data.sort(sortByDate);
				}
				this.setState({ items: res.data });
			});
		});
	};

	clearItemsHandler = () => {
		ItemAPI.deleteAllItems().then(() => {
			ItemAPI.getItems().then(() => {
				this.setState({
					items: []
				});
			});
		});
	};

	addItemHandler = () => {
		ItemAPI.addItem({ name: this.state.newItem }).then(() =>
			ItemAPI.getItems().then((res) => {
				if (this.state.sort === 'Name') {
					res.data.sort(sortByName);
				} else {
					res.data.sort(sortByDate);
				}
				this.setState({ items: res.data, newItem: '' });
			})
		);
	};

	deleteItemHandler = (i, id) => {
		ItemAPI.deleteItem(id);
		const items = [...this.state.items];
		items.splice(i, 1);
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
									key={i}
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
