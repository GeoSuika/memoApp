// src/components/MemoList.js

import React from 'react';
import MemoItem from './MemoItem';

const MemoList = ({ memos, onDelete }) => {
  return (
    <div>
      <h2>Memo List</h2>
      <ul>
        {memos.map((memo) => (
          <MemoItem key={memo.id} memo={memo} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default MemoList;
