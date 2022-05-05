const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/posts');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const app = express();

require('./connections');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

/* 
在 app.js 加入  uncaughtException、unhandledRejection 處理
並在錯誤發生時可正確在 server 紀錄錯誤

同步程式錯誤測試：app.js 中有未定義的變數
非同步錯誤測試： routes/posts.js 取得資料函式有錯誤，且未使用 catch 接錯

註：需在初次啟用 server 時才會出現 uncaughtException 或 unhandledRejection 錯誤
*/

// 錯誤：未定義變數 test
// test



module.exports = app;
