// Web Workers Manager
class WorkerManager {
  constructor() {
    this.workers = new Map();
    this.stats = {
      activeWorkers: 0,
      totalTasks: 0,
      totalTime: 0
    };
  }

  createWorker(name, path) {
    if (!this.workers.has(name)) {
      const worker = new Worker(path);
      this.workers.set(name, worker);
      this.updateStats();
    }
    return this.workers.get(name);
  }

  terminateWorker(name) {
    const worker = this.workers.get(name);
    if (worker) {
      worker.terminate();
      this.workers.delete(name);
      this.updateStats();
    }
  }

  updateStats() {
    this.stats.activeWorkers = this.workers.size;
    document.getElementById('activeWorkers').textContent = this.stats.activeWorkers;
    document.getElementById('totalTasks').textContent = this.stats.totalTasks;

    const avgTime = this.stats.totalTasks > 0
      ? (this.stats.totalTime / this.stats.totalTasks).toFixed(2)
      : 0;
    document.getElementById('avgTime').textContent = `${avgTime}ms`;
  }

  recordTask(time) {
    this.stats.totalTasks++;
    this.stats.totalTime += time;
    this.updateStats();
  }
}

const workerManager = new WorkerManager();

// Prime Number Calculator
const primeButton = document.getElementById('calculatePrimes');
const primeResult = document.getElementById('primeResult');
const primeProgress = document.getElementById('primeProgress');

primeButton.addEventListener('click', () => {
  const start = parseInt(document.getElementById('primeStart').value);
  const end = parseInt(document.getElementById('primeEnd').value);

  if (start >= end) {
    primeResult.innerHTML = '<h3>Error:</h3><p>Start must be less than end</p>';
    return;
  }

  primeButton.disabled = true;
  document.getElementById('mainThread').textContent = 'Free';

  const startTime = performance.now();
  const worker = workerManager.createWorker('prime', './workers/primeWorker.js');

  primeResult.innerHTML = '<h3>Calculating...</h3><p>Processing primes...</p>';
  primeProgress.style.width = '0%';

  worker.onmessage = (e) => {
    const { type, data } = e.data;

    if (type === 'PROGRESS') {
      const progress = ((data.current - start) / (end - start)) * 100;
      primeProgress.style.width = `${progress}%`;
      primeResult.innerHTML = `
        <h3>Progress:</h3>
        <p>Checking: ${data.current.toLocaleString()} / ${end.toLocaleString()}</p>
        <p>Found: ${data.found.toLocaleString()} primes</p>
      `;
    } else if (type === 'PRIMES_RESULT') {
      const endTime = performance.now();
      const time = (endTime - startTime).toFixed(2);

      primeProgress.style.width = '100%';
      primeResult.innerHTML = `
        <h3>✅ Complete!</h3>
        <p><strong>Found:</strong> ${data.count.toLocaleString()} prime numbers</p>
        <p><strong>Time:</strong> ${time}ms</p>
        <p><strong>Range:</strong> ${start.toLocaleString()} - ${end.toLocaleString()}</p>
      `;

      primeButton.disabled = false;
      workerManager.recordTask(parseFloat(time));
    }
  };

  worker.onerror = (error) => {
    primeResult.innerHTML = `<h3>Error:</h3><p>${error.message}</p>`;
    primeButton.disabled = false;
  };

  worker.postMessage({
    type: 'CALCULATE_PRIMES',
    data: { start, end }
  });
});

// Array Sorter
const sortButton = document.getElementById('sortArray');
const sortResult = document.getElementById('sortResult');

sortButton.addEventListener('click', () => {
  const size = parseInt(document.getElementById('arraySize').value);
  const algorithm = document.getElementById('sortAlgorithm').value;

  sortButton.disabled = true;
  document.getElementById('mainThread').textContent = 'Free';

  const array = Array.from({ length: size }, () => Math.floor(Math.random() * 10000));

  sortResult.innerHTML = `
    <h3>Sorting...</h3>
    <p>Algorithm: ${algorithm.toUpperCase()}</p>
    <p>Array size: ${size.toLocaleString()} elements</p>
  `;

  const startTime = performance.now();
  const worker = workerManager.createWorker('sort', './workers/sortWorker.js');

  worker.onmessage = (e) => {
    const { type, data } = e.data;

    if (type === 'SORT_RESULT') {
      const endTime = performance.now();
      const totalTime = (endTime - startTime).toFixed(2);

      const isSorted = data.sorted.every((val, i, arr) => i === 0 || arr[i - 1] <= val);

      sortResult.innerHTML = `
        <h3>✅ Complete!</h3>
        <p><strong>Algorithm:</strong> ${data.algorithm.toUpperCase()}</p>
        <p><strong>Array size:</strong> ${size.toLocaleString()} elements</p>
        <p><strong>Time:</strong> ${totalTime}ms</p>
        <p><strong>Sorted correctly:</strong> ${isSorted ? 'Yes ✓' : 'No ✗'}</p>
        <p><strong>First 5:</strong> [${data.sorted.slice(0, 5).join(', ')}...]</p>
        <p><strong>Last 5:</strong> [...${data.sorted.slice(-5).join(', ')}]</p>
      `;

      sortButton.disabled = false;
      workerManager.recordTask(parseFloat(totalTime));
    }
  };

  worker.onerror = (error) => {
    sortResult.innerHTML = `<h3>Error:</h3><p>${error.message}</p>`;
    sortButton.disabled = false;
  };

  worker.postMessage({
    type: 'SORT_ARRAY',
    data: { array, algorithm }
  });
});

// Image Processor
const imageInput = document.getElementById('imageInput');
const imageFilter = document.getElementById('imageFilter');
const processButton = document.getElementById('processImage');
const imageResult = document.getElementById('imageResult');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');

let originalImageData = null;

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      processButton.disabled = false;

      imageResult.innerHTML = `
        <h3>Image Loaded</h3>
        <p><strong>Size:</strong> ${img.width} × ${img.height}px</p>
        <p>Select a filter and click "Apply Filter"</p>
      `;

      document.querySelector('.file-input-label').textContent = file.name;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

processButton.addEventListener('click', () => {
  if (!originalImageData) return;

  const filter = imageFilter.value;
  processButton.disabled = true;
  document.getElementById('mainThread').textContent = 'Free';

  imageResult.innerHTML = `
    <h3>Processing...</h3>
    <p>Applying ${filter} filter...</p>
  `;

  const startTime = performance.now();
  const worker = workerManager.createWorker('image', './workers/imageWorker.js');

  const imageData = ctx.createImageData(originalImageData.width, originalImageData.height);
  imageData.data.set(originalImageData.data);

  worker.onmessage = (e) => {
    const { type, data } = e.data;

    if (type === 'IMAGE_RESULT') {
      const endTime = performance.now();
      const time = (endTime - startTime).toFixed(2);

      ctx.putImageData(data.imageData, 0, 0);

      imageResult.innerHTML = `
        <h3>✅ Complete!</h3>
        <p><strong>Filter:</strong> ${data.filter.toUpperCase()}</p>
        <p><strong>Time:</strong> ${time}ms</p>
        <p><strong>Size:</strong> ${canvas.width} × ${canvas.height}px</p>
      `;

      processButton.disabled = false;
      workerManager.recordTask(parseFloat(time));
    }
  };

  worker.onerror = (error) => {
    imageResult.innerHTML = `<h3>Error:</h3><p>${error.message}</p>`;
    processButton.disabled = false;
  };

  worker.postMessage({
    type: 'PROCESS_IMAGE',
    data: { imageData, filter }
  }, [imageData.data.buffer]);
});

// Demonstrate main thread is not blocked
setInterval(() => {
  const mainThreadStatus = document.getElementById('mainThread');
  if (mainThreadStatus.textContent === 'Free') {
    mainThreadStatus.style.color = '#10b981';
  }
}, 100);

console.log('✅ Web Workers Demo initialized');
console.log('Workers available:', workerManager.workers.size);
