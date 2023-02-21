import React from 'react';

const Message = ({ type, msg }) => {
  return <div className={type}>{msg}</div>;
};

export default Message;
