const Notification = ({ message }) =>
  message ? (
    <div className={message.type} id='message'>
      {message.text}
    </div>
  ) : null

export default Notification
