// Prime Number Calculator Worker
self.addEventListener('message', (e) => {
  const { type, data } = e.data;

  if (type === 'CALCULATE_PRIMES') {
    const { start, end } = data;
    const primes = findPrimes(start, end);

    self.postMessage({
      type: 'PRIMES_RESULT',
      data: { primes, count: primes.length }
    });
  }
});

function findPrimes(start, end) {
  const primes = [];

  for (let num = start; num <= end; num++) {
    if (isPrime(num)) {
      primes.push(num);

      // Report progress every 1000 numbers
      if (primes.length % 100 === 0) {
        self.postMessage({
          type: 'PROGRESS',
          data: { current: num, total: end, found: primes.length }
        });
      }
    }
  }

  return primes;
}

function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  const sqrt = Math.sqrt(num);
  for (let i = 3; i <= sqrt; i += 2) {
    if (num % i === 0) return false;
  }

  return true;
}
