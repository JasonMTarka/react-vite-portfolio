const MessageDisplay = ({ message }: { message: string[] }) => {
  return (
    <div className="message-display">
      {message.map((val, i) => {
        return <div key={i}>{val}</div>;
      })}
    </div>
  );
};

export default MessageDisplay;
