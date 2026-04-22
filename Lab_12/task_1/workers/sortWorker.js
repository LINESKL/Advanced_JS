// Array Sorting Worker
self.addEventListener('message', (e) => {
  const { type, data } = e.data;

  if (type === 'SORT_ARRAY') {
    const { array, algorithm } = data;
    const startTime = performance.now();

    let sorted;
    switch (algorithm) {
      case 'quick':
        sorted = quickSort([...array]);
        break;
      case 'merge':
        sorted = mergeSort([...array]);
        break;
      case 'bubble':
        sorted = bubbleSort([...array]);
        break;
      default:
        sorted = [...array].sort((a, b) => a - b);
    }

    const endTime = performance.now();

    self.postMessage({
      type: 'SORT_RESULT',
      data: {
        sorted,
        algorithm,
        time: (endTime - startTime).toFixed(2)
      }
    });
  }
});

function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
