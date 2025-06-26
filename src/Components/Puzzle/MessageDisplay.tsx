const MessageDisplay = ({ message }: { message: string[] }) => {
  const renderMessages = () => {
    return message.map((val, i) => {
      return <div key={i}>{val}</div>;
    });
  };

  return <div className="message-display">{renderMessages()}</div>;
};

export default MessageDisplay;
