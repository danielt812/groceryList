import axios from 'axios';

export default {
	getItems: () => {
		return axios.get('/api/items');
	},
	deleteItem: (id) => {
		return axios.delete('/api/items/' + id);
	},
	deleteAllItems: () => {
		return axios.delete('/api/items');
	},
	addItem: (data) => {
		return axios.post('/api/items', data);
	},
	updateActiveItem: (id) => {
		return axios.put('/api/items/' + id);
	}
};
