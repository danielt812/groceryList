const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// Get all items
router.get('/', (req, res) => {
	Item.find()
		.sort({ date: -1 })
		.then((items) => res.json(items));
});

// Get item by id
router.get('/:id', (req, res) => {
	Item.findById(req.params.id).then((item) => res.json(item));
});

// Add new item
router.post('/', (req, res) => {
	const newItem = new Item({
		name: req.body.name
	});

	newItem.save().then((item) => res.json(item));
});

// Delete all items
router.delete('/', (req, res) => {
	Item.deleteMany({})
		.then(() => res.json({ deleted: true }))
		.catch((err) => res.status(404).json({ success: false }));
});

// Delete item by id
router.delete('/:id', (req, res) => {
	Item.findById(req.params.id).then((item) =>
		item
			.remove()
			.then(() => res.json({ deleted: true }))
			.catch((err) => res.status(404).json({ success: false }))
	);
});

// Modify an item
router.put('/:id', (req, res) => {
	Item.findById(req.params.id).then((item) =>
		item
			.updateOne({ active: !item.active })
			.then(() => res.json({ success: true }))
			.catch((err) => res.status(404).json({ success: false }))
	);
});

module.exports = router;
