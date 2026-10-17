import assert from 'node:assert/strict';

// Pure sequential teaching model. These integers are an explicit clock, not ms.
const initial = (state = 'held') => ({
  id: 'R41', seat: 'S7', owner: 'T1', state,
  expiresAt: 600, cutoff: 800,
  refund: state === 'cancelled' ? 'pending' : 'none',
});

function transition(current, event, actor, now, paymentAccepted = false) {
  const refuse = () => ({ ok: false, reservation: current, acknowledged: [] });
  const accept = (changes, acknowledged) => ({
    ok: true, reservation: { ...current, ...changes }, acknowledged,
  });
  if (event === 'expire') {
    return actor === 'system' && current.state === 'held' && now >= current.expiresAt
      ? accept({ state: 'expired' }, ['hold-expired']) : refuse();
  }
  if (event === 'settle') {
    return actor === 'system' && current.state === 'cancelled' && current.refund === 'pending'
      ? accept({ refund: 'settled' }, ['refund-settled']) : refuse();
  }
  if (actor !== current.owner) return refuse();
  if (event === 'confirm' && current.state === 'held' && now < current.expiresAt && paymentAccepted) {
    return accept({ state: 'confirmed' }, ['booking-confirmed']);
  }
  if (event === 'release' && current.state === 'held' && now < current.expiresAt) {
    return accept({ state: 'released' }, ['hold-released']);
  }
  if (event === 'cancel' && current.state === 'confirmed' && now < current.cutoff) {
    return {
      ok: true,
      reservation: { ...current, state: 'cancelled', refund: 'pending' },
      acknowledged: ['seat-released', 'refund-obligation-accepted'],
    };
  }
  return refuse();
}

// Concrete journey: the consumer can distinguish obligation from settlement.
const held = initial();
const confirmed = transition(held, 'confirm', 'T1', 200, true);
assert.equal(confirmed.ok, true);
assert.equal(confirmed.reservation.state, 'confirmed');
const cancelled = transition(confirmed.reservation, 'cancel', 'T1', 300);
assert.deepEqual(cancelled.acknowledged, ['seat-released', 'refund-obligation-accepted']);
assert.equal(cancelled.reservation.refund, 'pending');
const settled = transition(cancelled.reservation, 'settle', 'system', 350);
assert.equal(settled.reservation.refund, 'settled');
assert.equal(settled.reservation.state, 'cancelled');
console.log('normal: R41 held -> confirmed -> cancelled; refund pending -> settled');

// Boundary witnesses independently name the refusal reason and no-change duty.
for (const [label, current, event, actor, now, payment] of [
  ['deadline', initial(), 'confirm', 'T1', 600, true],
  ['authority', initial(), 'confirm', 'T2', 200, true],
  ['payment', initial(), 'confirm', 'T1', 200, false],
  ['terminal', initial('expired'), 'confirm', 'T1', 200, true],
  ['cutoff', initial('confirmed'), 'cancel', 'T1', 800, false],
]) {
  const snapshot = JSON.stringify(current);
  const result = transition(current, event, actor, now, payment);
  assert.equal(result.ok, false, label);
  assert.equal(JSON.stringify(current), snapshot, label);
  assert.deepEqual(result.reservation, current, label);
  assert.deepEqual(result.acknowledged, [], label);
}
assert.equal(transition(initial(), 'expire', 'system', 600).reservation.state, 'expired');
assert.equal(transition(initial('confirmed'), 'expire', 'system', 600).ok, false);
assert.equal(transition(initial(), 'release', 'T1', 200).reservation.refund, 'none');
assert.equal(transition(settled.reservation, 'settle', 'system', 400).ok, false);
console.log('boundaries: deadline/authority/payment/terminal/cutoff refused unchanged; expiry releases only a hold');

// Independent declarative oracle: permitted state/event pairs and guard duties.
const rules = [
  { from: 'held', event: 'confirm', to: 'confirmed', owner: true, before: 'expiresAt', payment: true, refund: 'none' },
  { from: 'held', event: 'release', to: 'released', owner: true, before: 'expiresAt', refund: 'none' },
  { from: 'held', event: 'expire', to: 'expired', system: true, atOrAfter: 'expiresAt', refund: 'none' },
  { from: 'confirmed', event: 'cancel', to: 'cancelled', owner: true, before: 'cutoff', refund: 'pending' },
  { from: 'cancelled', event: 'settle', to: 'cancelled', system: true, refund: 'settled' },
];
let checked = 0;
for (const state of ['held', 'confirmed', 'released', 'expired', 'cancelled']) {
  for (const event of ['confirm', 'release', 'expire', 'cancel', 'settle', 'unknown']) {
    for (const actor of ['T1', 'T2', 'system']) {
      for (const now of [599, 600, 799, 800]) {
        for (const payment of [false, true]) {
          const current = initial(state);
          const before = JSON.stringify(current);
          const rule = rules.find(row => row.from === state && row.event === event);
          const allowed = Boolean(rule
            && (!rule.owner || actor === current.owner)
            && (!rule.system || actor === 'system')
            && (!rule.before || now < current[rule.before])
            && (!rule.atOrAfter || now >= current[rule.atOrAfter])
            && (!rule.payment || payment));
          const result = transition(current, event, actor, now, payment);
          const context = `${state}/${event}/${actor}/${now}/${payment}`;
          assert.equal(result.ok, allowed, context);
          assert.equal(JSON.stringify(current), before, `input mutated: ${context}`);
          assert.equal(result.reservation.id, current.id, context);
          assert.equal(result.reservation.seat, current.seat, context);
          assert.equal(result.reservation.owner, current.owner, context);
          if (allowed) {
            assert.equal(result.reservation.state, rule.to, context);
            assert.equal(result.reservation.refund, rule.refund, context);
          } else {
            assert.deepEqual(result.reservation, current, context);
            assert.deepEqual(result.acknowledged, [], context);
          }
          checked += 1;
        }
      }
    }
  }
}
assert.equal(checked, 720);
console.log(`finite table: ${checked} state/event/actor/time/payment combinations match declared guards`);

// Deliberately wrong boundary: changing a field is not the promised cancellation.
const rawUpdate = { ...initial('confirmed'), state: 'cancelled' };
assert.equal(rawUpdate.refund, 'none');
assert.notEqual(rawUpdate.refund, cancelled.reservation.refund);
console.log('counterexample: raw status update says cancelled but has no refund obligation');
