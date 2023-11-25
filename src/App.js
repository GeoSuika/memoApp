//src/App.js

import React, {useState , useEffect} from 'react';
import MemoList from './components/MemoList';
import MemoForm from './components/MemoForm';

const App = () => {
    const [memos,setMemos] = useState([]);

    // const handleAddMemo = (newMemo) => {
    //     setMemos([...memos, { id: Date.now(), ...newMemo }]);
    // };

    const handleAddMemo = async (newMemo) => {
        try {
          console.log('handleAddMemo Start!');
          const response = await fetch('http://localhost:3001/api/memos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMemo),
          });
    
          if (!response.ok) {
            throw new Error('Failed to create memo');
          }
    
          const result = await response.json();
          setMemos([...memos, { id: result.id, ...newMemo }]);
        } catch (error) {
          console.error('Error creating memo:', error);
          // エラー処理を追加するか、ユーザーにエラーメッセージを表示するなどの適切な処理を行います
        }
      };   

    // const handleDeleteMemo = (memoId) => {
    //     setMemos(memos.filter((memo) => memo.id !== memoId));
    // };

    const handleDeleteMemo = async (memoId) => {
        try {
          console.log('handleDeleteMemo Start!');
          const response = await fetch('http://localhost:3001/api/memos/${memoId}', {
            method: 'DELETE',
          });
    
          if (!response.ok) {
            throw new Error('Failed to create memo');
          }
        // サーバからは何も帰ってこないので、下記定義はいらない
        //   const result = await response.json();
          setMemos(memos.filter((memo) => memo.id !== memoId));
        } catch (error) {
          console.error('Error creating memo:', error);
          // エラー処理を追加するか、ユーザーにエラーメッセージを表示するなどの適切な処理を行います
        }
      };  

    // MemoList を表示する際、コンポーネントがマウントされた時点でメモを取得する
    useEffect(() => {
        const handleGetMemos = async () => {
            try {
                console.log('handleGetMemos Start!');
                const response = await fetch('http://localhost:3001/api/memos', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch memos: ${response.statusText}`);
                }
                const result = await response.json();
                // レスポンスが空であるかどうかを確認
                if (!result || Object.keys(result).length === 0) {
                    console.error('Empty or invalid JSON response');
                    // 適切なエラーメッセージを表示するか、適切なエラー処理を行う
                    return;
                }

                setMemos(result); // レスポンスから取得したメモのデータを更新
            } catch (error) {
            console.error('Error fetching memos:', error);
            // エラー処理を追加するか、ユーザーにエラーメッセージを表示するなどの適切な処理を行います
            }
        };
        handleGetMemos();
    }, []); // 第二引数の空の配列は、コンポーネントの初回描画時に一度だけ実行されることを示しています

    return (
        <div>
            <h1>Memo App</h1>
            <MemoForm onAdd={handleAddMemo} />
            <MemoList memos={memos} onDelete={handleDeleteMemo} />
        </div>
    );
};

export default App;