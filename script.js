let port;
let writer;
let debounceTimer;
let currentBrightness = 128;

document.getElementById("connectButton")
.addEventListener("click", async () => {

  try {

    port = await navigator.serial.requestPort();

    await port.open({
      baudRate: 9600
    });

    writer = port.writable.getWriter();

    alert("Connected to Arduino!");

  } catch (error) {

    alert("Connection Failed: " + error);

  }
});

document.getElementById("brightnessSlider")
.addEventListener("input", async (event) => {

  let newBrightness = event.target.value;

  document.getElementById("brightnessValue")
  .innerText = newBrightness;

  if (newBrightness != currentBrightness) {

    currentBrightness = newBrightness;

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(async () => {

      if (writer) {

        let data = new TextEncoder()
        .encode(currentBrightness + "\n");

        await writer.write(data);

      }

    }, 300);
  }
});