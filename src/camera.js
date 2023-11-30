export async function getVideo(previewCanvas) {
  const avStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  const video = document.createElement("video");
  try {
    // modern browsers
    video.srcObject = avStream;
  } catch (error) {
    // old browsers
    video.src = window.URL.createObjectURL(avStream);
  }

  if (previewCanvas) {
    video.addEventListener("canplay", () => {
      drawPreview(video, previewCanvas);
    });
  }

  await video.play();
  return video;
}

export function drawVideo(video, canvas) {
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
}

export function drawVideoBW(video, canvas) {
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  for (i = 0; i < context.data.length; i += 4) {
    let count = context.data[i] + context.data[i + 1] + context.data[i + 2];
    let color = 0;
    if (count > 510) color = 255;
    else if (count > 255) color = 127.5;

   context.data[i] = color;
   context.data[i + 1] = color;
   context.data[i + 2] = color;
   context.data[i + 3] = 255;
  }
  ctx.putImageData(context, 0, 0);
}

export function drawPreview(video, canvas) {
  const context = canvas.getContext("2d");
  setInterval(() => {
    context.drawImage(
      video,
      0,
      0,
      video.videoWidth,
      video.videoHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  }, 16);
}
