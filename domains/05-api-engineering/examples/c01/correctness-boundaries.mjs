import assert from 'node:assert/strict';

// A pure model: a fixed list of small strings, no HTTP or streaming parser.
function parseIntent(text) {
  let value;
  try {
    value = JSON.parse(text);
  } catch {
    return { refused: 'syntax' };
  }
  if (value === null || Array.isArray(value) || typeof value !== 'object'
    || Object.keys(value).length !== 1 || typeof value.seatId !== 'string'
    || value.seatId !== 'S7') {
    return { refused: 'shape-or-value' };
  }
  return { seatId: value.seatId };
}

let effects = 0;
function admit(text) {
  const intent = parseIntent(text);
  if (intent.refused) return intent;
  effects += 1;
  return { accepted: intent.seatId };
}

assert.equal(admit('{').refused, 'syntax');
for (const text of ['null', '[]', '{"seatId":7}', '{"seatId":"S7","owner":"Bob"}']) {
  assert.equal(admit(text).refused, 'shape-or-value');
}
assert.equal(effects, 0);
console.log('malformed/invalid: refused; effects=0');
assert.deepEqual(admit('{"seatId":"S7"}'), { accepted: 'S7' });
assert.equal(effects, 1);

// These are separate fixtures. Each permits independent reservations for the
// duplication demonstration; it does not model uniqueness of a seat hold.
function provider(replayAgreement) {
  let created = 0;
  const receipts = new Map();
  return {
    create(intentId, seatId) {
      if (replayAgreement && receipts.has(intentId)) {
        const old = receipts.get(intentId);
        if (old.seatId !== seatId) return { refused: 'intent-mismatch' };
        return old;
      }
      const result = { reservation: `R${++created}`, seatId };
      if (replayAgreement) receipts.set(intentId, result);
      return result;
    },
    count: () => created,
  };
}

const unqualified = provider(false);
unqualified.create('I9', 'S7'); // Effect occurs; caller's observation is omitted.
unqualified.create('I9', 'S7'); // A repeated string alone supplies no agreement.
assert.equal(unqualified.count(), 2);
const replay = provider(true);
const committed = replay.create('I9', 'S7');
assert.deepEqual(replay.create('I9', 'S7'), committed);
assert.deepEqual(replay.create('I9', 'S8'), { refused: 'intent-mismatch' });
assert.equal(replay.count(), 1);
console.log('unqualified retry: effects=2; replay agreement: effects=1');

// A deterministic enumeration of two interleavings, not concurrent processes.
let split = { state: 'held', version: 7 };
const cancelChecked = split.version === 7;
const extendChecked = split.version === 7;
assert.equal(cancelChecked && extendChecked, true);
if (cancelChecked) split = { state: 'cancelled', version: 8 };
if (extendChecked) split = { state: 'held', version: 8 };
assert.deepEqual(split, { state: 'held', version: 8 });

let atomic = { state: 'held', version: 7 };
function change(expected, nextState) {
  if (atomic.version !== expected || atomic.state !== 'held') return false;
  atomic = { state: nextState, version: atomic.version + 1 };
  return true;
}
assert.equal(change(7, 'cancelled'), true);
assert.equal(change(7, 'held'), false);
assert.deepEqual(atomic, { state: 'cancelled', version: 8 });
console.log('split check/write: stale overwrite; atomic condition: second refused');

// Separate object conditions do not protect a common capacity of one.
let capacity = 1;
const reservations = [{ version: 1, admitted: false }, { version: 1, admitted: false }];
const sawAvailability = reservations.map(() => capacity > 0);
for (let index = 0; index < reservations.length; index += 1) {
  if (sawAvailability[index] && reservations[index].version === 1) {
    reservations[index] = { version: 2, admitted: true };
    capacity -= 1;
  }
}
assert.equal(reservations.filter(item => item.admitted).length, 2);
assert.equal(capacity, -1);
console.log('per-object versions: both pass; shared capacity violated');
