import React from 'react';

const Message = ({ type, msg }) => {
  return <div class={type}>{msg}</div>;
};

export default Message;
