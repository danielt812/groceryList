import axios from 'axios';

export default {
	getSettings: () => {
		return axios.get('/api/settings');
	},
	updateSettings: (id, body) => {
		return axios.put('/api/settings/' + id, body);
	}
};
