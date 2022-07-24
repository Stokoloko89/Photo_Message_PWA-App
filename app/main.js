const camera = new Camera($("#player")[0]);

// Main app logic
const _init = () => {
  // Switch on camera in viewfinder
  $("#viewfinder").on("show.bs.modal", () => {
    camera.switch_on();
  });

  //   Init new message instance
  const messages = new Message();

  // Notify user of connection errors
  window.addEventListener("messages_error", () => {
    toastr.error(
      "Messages could not be retrieved.<br>Will keep trying.",
      "Network Connection Error"
    );

    // Listen for new message event
    window.addEventListener("new_message", (e) => {
      // Render message
      renderMessage(e.detail);
    });
  });

  // Switch off camera in viewfinder
  $("#viewfinder").on("hidden.bs.modal", () => {
    camera.switch_off();
  });

  // Take photo
  $("#shutter").on("click", () => {
    let photo = camera.take_photo();
    //   Show photo preview in camera button
    $("#camera").css("background-image", `url(${photo})`).addClass("withphoto");
  });

  // Submit Message
  $("#send").on("click", () => {
    // Get Caption Text
    let caption = $("#caption").val();

    // Check if message is ok
    if (!camera.photo || !caption) {
      // Show notification & return
      toastr.warning("Photo & Caption required.", "Incomplete Message");
      return;
    }

    // Add new message
    let message = messages.add(camera.photo, caption);

    //   Render new message in feed
    renderMessage(message);

    // Reset caption & photo if successfully sent
    $("#caption").val("");
    $("#camera").css("background-image", "").removeClass("withphoto");
    camera.photo = null;
  });
};

// Create new message element with
const renderMessage = (message) => {
  // Message HTML
  let msgHTML = `
    <div style='display:none' class="row message bg-light mb-2 rounded shadow">
    <div class="col-2 p-1">
    <img src="${message.photo}" class="photo w-100 rounded">
    </div>
    <div class="col-10 p-1">${message.caption}</div>
    </div>
    `;

  // Prepend to #messages
  $(msgHTML)
    .prependTo("#messages")
    .show(500)

    //   Bind a click handler on a new image element to show in modal
    .find("img")
    .on("click", showPhoto);
};

// Show message photo in modal
const showPhoto = (e) => {
  // Get photo src
  let photoSrc = $(e.target).attr("src");

  // Set to and show photoframe modal
  $("#photoframe img").attr("src", photoSrc);
  $("#photoframe").modal("show");
};
