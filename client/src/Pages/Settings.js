import React, { Component } from 'react';
import api from '../Utils/SettingsAPI';
import Setting from '../Components/Setting';

class Settings extends Component {
	state = {
		loaded: false,
		sort: { id: '', option: '' }
	};

	componentDidMount() {
		api
			.getSettings()
			.then((res) => {
				this.setState({
					sort: { id: res.data[0]._id, option: res.data[0].sort }
				});
				this.setState({ loaded: true });
			})
			.catch((err) => console.log(err));
	}

	handleSortChange = (e) => {
		api.updateSettings(this.state.sort.id, { sort: e.target.value });
		let val = e.target.value;
		let state = this.state.sort;
		state.option = val;
		this.setState({ sort: state });
	};

	render() {
		const sortOptions = [
			{ value: 'Name', label: 'Name' },
			{ value: 'Date', label: 'Date' }
		];
		return (
			<div className='Settings'>
				<div className='settings-flex'>
					{this.state.loaded ? (
						<Setting
							setting='Sort'
							options={sortOptions}
							onChange={this.handleSortChange}
							optionState={this.state.sort.option}
						/>
					) : null}
				</div>
			</div>
		);
	}
}

export default Settings;
