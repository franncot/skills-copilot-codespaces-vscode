// Create web server

// Import express
const express = require('express');
// Import router
const router = express.Router();
// Import comment model
const Comment = require('../models/Comment');
// Import post model
const Post = require('../models/Post');

// @route   GET api/comments/:postId
// @desc    Get all comments by post id
// @access  Public
router.get('/:postId', (req, res) => {
    Comment.find({ postId: req.params.postId })
        .sort({ date: -1 })
        .then(comments => res.json(comments))
        .catch(err => res.status(404).json({ nocommentsfound: 'No comments found' }));
});

// @route   POST api/comments/:postId
// @desc    Create comment
// @access  Public
router.post('/:postId', (req, res) => {
    Post.findById(req.params.postId)
        .then(post => {
            const newComment = new Comment({
                postId: req.params.postId,
                body: req.body.body,
