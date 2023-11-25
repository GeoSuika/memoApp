// src/components/MemoList.js

import React from 'react';
import MemoItem from './MemoItem';

const MemoList = ({ memos, onDelete }) => {
  return (
    <div>
      <h2>Memo List</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>content</th>
            <th>button</th>
          </tr>
        {memos.map((memo) => (
          <MemoItem key={memo.id} memo={memo} onDelete={onDelete} />
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemoList;
