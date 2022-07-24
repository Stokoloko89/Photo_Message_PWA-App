class Message {
  constructor() {
    this.messages = [];

    // Connect to web socket on server
    this.socket = io();

    // Handle connection error
    this.socket.once("connect_error", () => {
      // Notify main.js via an Event
      window.dispatchEvent(new Event("messages_error"));
    });

    // Listen for new messages from server
    this.socket.on("new_message", (message) => {
      // Add to local messages queue
      this.messages.unshift(message);
      
      // Notify client via an Event
      window.dispatchEvent(new CustomEvent("new_message", { detail: message }));
    });
  }

  // Get all messages
  get all() {
    return this.messages;
  }

  // Add a new message to the message
  add(data_url, caption_text) {
    // create a new message object
    let message = {
      photo: data_url,
      caption: caption_text,
    };

    // add the message to the message array (local messages)
    this.messages.unshift(message);

    // Notify to server
    this.socket.emit("new_message", message);

    // Return formatted message object
    return message;
  }
}
