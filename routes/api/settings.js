const router = require('express').Router();

// Item Model
const Settings = require('../../models/Settings');

router.get('/', (req, res) => {
	Settings.find()
		.then((settings) => res.json(settings))
		.catch((err) => console.log(err));
});

router.put('/:id', (req, res) => {
	Settings.findByIdAndUpdate({ _id: req.params.id }, req.body)
		.then((settings) => res.json(settings))
		.catch((err) => console.log(err));
});

router.post('/', (req, res) => {
	const newSettings = new Settings({
		name: req.body.name
	});

	newSettings.save().then((settings) => res.json(settings));
});

module.exports = router;
