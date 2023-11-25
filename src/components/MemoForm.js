// src/components/MemoForm.js

import React, {useState} from 'react';

const MemoForm = ({ onAdd}) => {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // バリデーションなどの追加が必要
        onAdd({title,content});
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Memo</h2>
            <label>Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>
            <label>Content:
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </label>
            <button type="submit">AddMemo</button>
        </form>
    );
};

export default MemoForm;