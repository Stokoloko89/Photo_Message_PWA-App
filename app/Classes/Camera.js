// Camera Class
class Camera {
  constructor(video_node) {
    // Camera stream DOM node
    this.video_node = video_node;
  }

  //   Camera feed (viewfinder) on
  switch_on() {
    // Get camera media stream and set on player <video>
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 600, height: 600 },
        audio: false,
      })
      .then((stream) => {
        this.video_node.srcObject = this.stream = stream;
      });
  }

  // Camera feed (viewfinder) off
  switch_off() {
    // Pause video_node
    this.video_node.pause();
    // Stop media stream
    this.stream.getTracks()[0].stop();
  }

  //   Capture photo from camera stream
  take_photo() {
    // Create a <canvas> element to draw the photo on
    let canvas = document.createElement("canvas");
    // Set canvas dimensions to be the same as the video stream
    canvas.setAttribute("width", 600);
    canvas.setAttribute("height", 600);

    // Get canvas context
    let ctx = canvas.getContext("2d");

    // Draw the image onto the canvas
    ctx.drawImage(this.video_node, 0, 0, canvas.width, canvas.height);

    // Get the data-url of the canvas
    this.photo = ctx.canvas.toDataURL();

    // Destroy the canvas
    ctx = null;
    canvas = null;

    return this.photo;
  }
}
