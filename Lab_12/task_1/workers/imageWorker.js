// Image Processing Worker
self.addEventListener('message', (e) => {
  const { type, data } = e.data;

  if (type === 'PROCESS_IMAGE') {
    const { imageData, filter } = data;

    let processed;
    switch (filter) {
      case 'grayscale':
        processed = applyGrayscale(imageData);
        break;
      case 'invert':
        processed = applyInvert(imageData);
        break;
      case 'sepia':
        processed = applySepia(imageData);
        break;
      case 'blur':
        processed = applyBlur(imageData);
        break;
      default:
        processed = imageData;
    }

    self.postMessage({
      type: 'IMAGE_RESULT',
      data: { imageData: processed, filter }
    }, [processed.data.buffer]);
  }
});

function applyGrayscale(imageData) {
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }

  return imageData;
}

function applyInvert(imageData) {
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }

  return imageData;
}

function applySepia(imageData) {
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
    data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
    data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
  }

  return imageData;
}

function applyBlur(imageData) {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const output = new Uint8ClampedArray(data);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;

      for (let c = 0; c < 3; c++) {
        let sum = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const i = ((y + dy) * width + (x + dx)) * 4 + c;
            sum += data[i];
          }
        }
        output[idx + c] = sum / 9;
      }
    }
  }

  imageData.data.set(output);
  return imageData;
}
