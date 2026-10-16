import assert from 'node:assert/strict';

// Each case is disposable, deterministic, and deliberately synchronous.
const hold = { id: 'H8', seat: 'S7', owner: 'T1', state: 'held', expiresAt: 600 };
const allocations = (h, b) => Number(h.state === 'held') + Number(b?.state === 'confirmed');
function convert(current, now, actor) {
  if (current.state !== 'held' || now >= current.expiresAt || actor !== current.owner) {
    return { ok: false, hold: current, booking: null };
  }
  // Assumption: one indivisible abstract conversion, not storage implementation.
  return {
    ok: true,
    hold: { ...current, state: 'converted', booking: 'B6' },
    booking: { id: 'B6', seat: current.seat, owner: current.owner, state: 'confirmed', sourceHold: current.id },
  };
}
const conversion = convert(hold, 200, 'T1');
assert.equal(conversion.ok, true);
assert.equal(allocations(conversion.hold, conversion.booking), 1);
assert.equal(conversion.hold.booking, conversion.booking.id);
assert.equal(conversion.booking.sourceHold, hold.id);
assert.equal(convert(hold, 600, 'T1').ok, false);
assert.equal(convert(hold, 200, 'T2').ok, false);
assert.equal(convert(conversion.hold, 200, 'T1').ok, false);
const splitConversion = { hold: { ...hold, state: 'converted' }, booking: null };
assert.equal(allocations(splitConversion.hold, splitConversion.booking), 0);
console.log('models: coherent H8 -> B6 conversion keeps 1 allocation; split conversion can lose it');

function transfer(current, from, to, accepted, now) {
  if (current.owner !== from || !accepted || current.state !== 'held' || now >= current.expiresAt) {
    return { ok: false, hold: current };
  }
  return { ok: true, hold: { ...current, owner: to } };
}
const moved = transfer(hold, 'T1', 'T2', true, 150);
assert.equal(moved.hold.id, 'H8');
assert.equal(moved.hold.owner, 'T2');
assert.equal(moved.hold.expiresAt, 600);
assert.equal(convert(moved.hold, 200, 'T1').ok, false);
assert.equal(convert(moved.hold, 200, 'T2').ok, true);
assert.equal(transfer(hold, 'T1', 'T2', false, 150).ok, false);
assert.equal(transfer(hold, 'T1', 'T2', true, 600).ok, false);
console.log('ownership: transfer keeps H8 identity/deadline; former owner cannot confirm');

// A supplied action is an old observation, not permission or reserved eligibility.
const control = { subject: hold.id, action: 'confirm' };
assert.equal(control.subject, moved.hold.id);
assert.equal(convert(moved.hold, 200, 'T1').ok, false);
assert.equal(convert(hold, 600, 'T1').ok, false);
console.log('affordance: same target survives; changed authority or deadline refuses stale control');

// Visibility restoration is intentionally independent of the allocation lifecycle.
const hidden = { id: 'R41', state: 'cancelled', refund: 'pending', hidden: true };
const restored = { ...hidden, hidden: false };
const bob = { id: 'R90', seat: 'S7', state: 'held' };
assert.equal(restored.id, hidden.id);
assert.equal(restored.state, 'cancelled');
assert.equal(restored.refund, 'pending');
assert.equal(bob.state, 'held');
console.log('restoration: R41 visible again but cancelled; pending obligation and Bob allocation unchanged');

// Shared-seat admission is assumed atomic here; object-specific guards alone fail.
function acquire(existing, candidate) {
  const occupied = existing.some(item => item.seat === candidate.seat
    && ['held', 'confirmed'].includes(item.state));
  return occupied ? { ok: false, reservations: existing }
    : { ok: true, reservations: [...existing, candidate] };
}
const first = acquire([], { id: 'R41', seat: 'S7', state: 'held' });
const second = acquire(first.reservations, { id: 'R90', seat: 'S7', state: 'held' });
assert.equal(first.ok, true);
assert.equal(second.ok, false);
assert.equal(second.reservations.length, 1);
// Two independent empty snapshots cannot establish the common invariant.
const independentA = acquire([], { id: 'R41', seat: 'S7', state: 'held' });
const independentB = acquire([], { id: 'R90', seat: 'S7', state: 'held' });
assert.equal(independentA.reservations.length + independentB.reservations.length, 2);
console.log('shared invariant: one common admission refuses second claim; independent snapshots admit 2');

function cancel(current, now) {
  if (current.state !== 'confirmed' || now >= current.cutoff) {
    return { ok: false, id: current.id, state: current.state, refund: current.refund, effect: 'none' };
  }
  return { ok: true, id: current.id, state: 'cancelled', refund: 'pending', effect: 'release-and-obligation' };
}
const r41 = { id: 'R41', state: 'confirmed', refund: 'none', cutoff: 800 };
const r42 = { id: 'R42', state: 'confirmed', refund: 'none', cutoff: 250 };
const decisions = [r41, r42].map(item => cancel(item, 300));
assert.deepEqual(decisions.map(item => item.ok), [true, false]);
assert.equal(decisions[0].refund, 'pending');
assert.equal(decisions[1].effect, 'none');
const atomicGroupAdmitted = [r41, r42].every(item => item.state === 'confirmed' && 300 < item.cutoff);
assert.equal(atomicGroupAdmitted, false);
console.log('aggregate: per-item R41 accepted/R42 refused; all-or-none alternative refuses group');

// Distinct effect histories intentionally yield the identical local observation.
const noEffectHistory = { actual: r41, observer: 'timeout', receipt: null };
const acceptedHistory = { actual: cancel(r41, 300), observer: 'timeout', receipt: { id: 'C9', subject: 'R41', intent: 'I9', effect: 'release-and-obligation' } };
assert.equal(noEffectHistory.observer, acceptedHistory.observer);
assert.notEqual(noEffectHistory.actual.state, acceptedHistory.actual.state);
assert.equal(acceptedHistory.receipt.intent, 'I9');
assert.equal(acceptedHistory.actual.refund, 'pending');
console.log('knowledge: timeout matches no effect and accepted cancellation; retained I9/C9 evidence distinguishes them');
