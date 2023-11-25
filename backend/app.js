//backend/app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');


// SQLiteデータベースの情報
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Database connection error:',err.message);
    }else{
        console.log('Connected to the SQLite database.');
        //テーブルの作成などの初期化処理をここに追加することができます
        db.run(`
        CREATE TABLE IF NOT EXISTS memos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          content TEXT
        )
      `);
    }
});

// ミドルウェアの設定（CORS対策やJSONのパースなど）
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CORS middlewareを追加
app.use(cors());

//ルートエンドポイント
app.get('/',(req,res) => {
    res.send('Hello,World!');
});

// メモの一覧取得
app.get('/api/memos',(req,res) =>{
    //メモの一覧を返すロジック
    console.log('メモの一覧取得 start!');
    db.all('SELECT * FROM memos', (err, rows) => {
        if(err){
            console.error('Database error:', err.message);
            res.status(500).json({error: 'Internal Server Error'});
        }else{
            res.json(rows);
        }
    })
});

// メモの取得
app.get('/api/memos/:id',(req,res) =>{
    //新しいメモを作成するロジック
    const memoId = req.params.id;
    db.get('SELECT * FROM memos WHERE id = ?', [memoId],(err, row) => {
        if(err){
            console.error('Database error:',err.message);
            res.status(500).json({error: 'Internal Server Error '});
        }else if(!row){
            res.status(404).json({error: 'Memo not found'});
        }else{
            res.json(row);
        }
    })
});
// メモの作成
app.post('/api/memos',(req,res) => {
    // 新しいメモを作成するロジック
    console.log('メモの作成 start!');
    const{title,content} =req.body;
    // トランザクションの開始
    db.run('BEGIN TRANSACTION');
    db.run('INSERT INTO memos (title, content) VALUES (?,?)',[title,content],function(err){
        if(err){
            console.error('Database error:',eer.message);
            res.status(500).json({error: 'Internal Server Error' });
        }else{
            res.json({ id: this.lastID });
        }
        // トランザクションのコミット
        db.run('COMMIT');
    });
});

// // メモの作成
// app.post('/api/memos', (req, res) => {
//     // 新しいメモを作成するロジック
//     const { title, content } = req.body;

//     // トランザクションの開始
//     db.run('BEGIN TRANSACTION');

//     db.run('INSERT INTO memos (title, content) VALUES (?, ?)', [title, content], function (err) {
//         if (err) {
//             console.error('Database error:', err.message);
            
//             // ロールバックしてトランザクションを取り消す
//             db.run('ROLLBACK');

//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             // トランザクションのコミット
//             db.run('COMMIT', (commitError) => {
//                 if (commitError) {
//                     console.error('Commit error:', commitError.message);
//                     res.status(500).json({ error: 'Internal Server Error' });
//                 } else {
//                     res.json({ id: this.lastID });
//                 }
//             });
//         }
//     });
// });

// メモの更新
app.put('/api/memos/:id',(req,res) => {
    // 特定のメモをIDで更新するロジック
    console.log('メモの更新 start!');
    const memoId = req.param.id;
    const{title,content} = req.body;
    // トランザクションの開始
    db.run('BEGIN TRANSACTION');
    db.run('UPDATE memos SET title = ?, content = ? WHERE id = ?',[title,content,memoId],(err) => {
        if(err){
            console.error('Database error:', err.message);
            res.status(500).json({error: 'Internal Server Error' });
        }else{
            res.json({succsess: true});
        }
        // トランザクションのコミット
        db.run('COMMIT');        
    });
});

// メモの削除
app.delete('/api/memos/:id',(req,res) =>{
    // 特定のメモをIDで削除するロジック
    console.log('メモの削除 start!');
    const memoId = req.params.id;
    // トランザクションの開始
    console.log('１');
    db.run('BEGIN TRANSACTION');
    db.run('DELETE FROM memos WHERE id = ?', [memoId],(err) => {
        if(err){
            console.log('２');
            console.error('Database error:', err.message);
            res.status(500).json({error: 'Internal Server Error' });
        }else{
            console.log('３');
            res.json({success: true});
        }
        // トランザクションのコミット
        db.run('COMMIT');        
        console.log('４');
    });
});

// サーバの起動
app.listen(port, () => {
    console.log('Server is running on port ${port}');
});
