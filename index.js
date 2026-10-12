'use strict';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function retry(fn, options = {}) {
  const { retries = 3, minDelay = 300, maxDelay = 2000, factor = 2, jitter = true, onRetry = () => {} } = options;
  let attempt = 0, delay = minDelay;
  for (;;) {
    try { return await fn(attempt); }
    catch (err) {
      if (attempt >= retries) throw err;
      const d = jitter ? delay * (0.5 + Math.random() * 0.5) : delay;
      onRetry(err, attempt + 1, d);
      await sleep(d);
      delay = Math.min(delay * factor, maxDelay);
      attempt++;
    }
  }
}

async function retryFetch(url, init = {}, options = {}) {
  return retry(async () => {
    const res = await fetch(url, init);
    if (!res.ok) { const e = new Error(`HTTP ${res.status}`); e.status = res.status; e.response = res; throw e; }
    return res;
  }, options);
}

module.exports = { retry, retryFetch };
module.exports.default = retry;
