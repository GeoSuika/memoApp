// src/components/MemoItem.js

import React from 'react';

const MemoItem = ({ memo, onDelete }) => {
  return (
    <li>
      <span>{memo.title}</span>
      <span>{memo.content}</span>
      <button onClick={() => onDelete(memo.id)}>Delete</button>
    </li>
  );
};

export default MemoItem;
