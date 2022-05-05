const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const User = require('../models/users');
const appError = require("../service/appError");

router.get('/', async(req, res, next) =>  {
  const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
  const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
  // 測試：帶入錯誤變數 timeSor
  const post = await Post.find(q).populate({
    path: 'user',
    select: 'name photo'
  }).sort(timeSort);
  res.status(200).json({
    status: 'success',
    results: post.length,
    data: {
      post
    }
  });
})
router.post('/', async(req, res, next) =>  {
  try {
    const data = req.body;
    if (!data.content) {
      // 將以下改為 
      res.status(400).json({
        "status": "false",
        "message": "content 欄位為必填"
      });
      return;
    }
    const newPost = await Post.create(
      {
        user: data.user,
        content: data.content,
        tags: data.tags,
        type:data.type
      }
    );
    res.status(200).json({
      status: 'success',
      data: newPost
    });
  } catch (error) {
    next(error);
  }
})

module.exports = router;
