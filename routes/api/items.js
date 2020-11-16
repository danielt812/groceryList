const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   Get all api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
	Item.find()
		.sort({ date: -1 })
		.then((items) => res.json(items));
});

// @route   Get api/items by id
// @desc    Get all items
// @access  Public
router.get('/:id', (req, res) => {
	Item.findById(req.params.id).then((item) => res.json(item));
});

// @route   POST api/items
// @desc    Create an item
// @access  Public
router.post('/', (req, res) => {
	const newItem = new Item({
		name: req.body.name
	});

	newItem.save().then((item) => res.json(item));
});

// @route   DELETE api/items
// @desc    Delete an item
// @access  Public
router.delete('/:id', (req, res) => {
	Item.findById(req.params.id).then((item) =>
		item
			.remove()
			.then(() => res.json({ deleted: true }))
			.catch((err) => res.status(404).json({ success: false }))
	);
});

router.delete('/', (req, res) => {
	Item.deleteMany({})
		.then(() => res.json({ deleted: true }))
		.catch((err) => res.status(404).json({ success: false }));
});

// @route   PUT api/items
// @desc    Modify an item
// @access  Public
// router.put('/:id', (req, res) => {
// 	Item.findById(req.params.id).then((item) =>
// 		item
// 			.update({ name: req.body.name })
// 			.then(() => res.json({ success: true }))
// 			.catch((err) => res.status(404).json({ success: false }))
// 	);
// });

module.exports = router;
