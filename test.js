const { retry } = require('./index.js');
(async () => {
  let n = 0;
  const r = await retry(async () => { if (++n < 3) throw new Error('fail'); return 'ok'; }, { minDelay: 10 });
  console.log(r === 'ok' ? 'PASS' : 'FAIL');
})();
