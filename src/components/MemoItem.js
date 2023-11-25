// src/components/MemoItem.js

import React from 'react';

const MemoItem = ({ memo, onDelete }) => {
  return (
    <tr>
      <td>{memo.title}</td>
      <td>{memo.content}</td>
      <td><button onClick={() => onDelete(memo.id)}>Delete</button></td>
    </tr>
  );
};

export default MemoItem;
