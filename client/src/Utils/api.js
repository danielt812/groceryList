import axios from 'axios';

export default {
	getItems: () => {
		return axios.get('/api/items');
	},
	deleteItem: (id) => {
		return axios.delete('/api/items/' + id);
	},
	addItem: (data) => {
		return axios.post('/api/items', data);
	}
};
