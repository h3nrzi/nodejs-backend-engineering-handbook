import assert from 'node:assert/strict';

const cancel = 'https://handbook.example/relations/cancel';
const targetA = '/reservations/R41/cancellation';
const targetB = '/cancellation-requests/R41';

function representation(target, state = 'held') {
  return {
    id: 'R41',
    state,
    actions: state === 'held'
      ? [{ rel: cancel, method: 'POST', href: target, type: 'application/json' }]
      : [],
  };
}

function guided(document) {
  const action = document.actions.find(item => item.rel === cancel);
  if (!action) return null;
  if (action.method !== 'POST' || action.type !== 'application/json') {
    throw new Error('unsupported control');
  }
  return { method: action.method, target: action.href, body: { reason: 'plans-changed' } };
}

function conventional(document) {
  return {
    method: 'POST',
    target: `/reservations/${document.id}/cancellation`,
    body: { reason: 'plans-changed' },
  };
}

// Each call models an independent disposable provider, not shared mutable state.
function submit(request, currentTarget, currentState = 'held') {
  if (!request) return 'no-action';
  if (request.target !== currentTarget) return 'retired-target';
  if (currentState !== 'held') return 'state-refusal';
  return 'cancelled';
}

assert.equal(submit(guided(representation(targetA)), targetA), 'cancelled');
assert.equal(submit(conventional(representation(targetA)), targetA), 'cancelled');
console.log('A: guided and conventional -> cancelled');

const guidedB = guided(representation(targetB));
const conventionalB = conventional(representation(targetB));
assert.equal(guidedB.target, targetB);
assert.equal(conventionalB.target, targetA);
assert.equal(submit(guidedB, targetB), 'cancelled');
assert.equal(submit(conventionalB, targetB), 'retired-target');
console.log(`B guided: ${guidedB.target} -> cancelled`);
console.log(`B conventional: ${conventionalB.target} -> retired-target`);

assert.equal(guided(representation(targetB, 'cancelled')), null);
assert.equal(submit(null, targetB), 'no-action');
console.log('B unavailable: no-action');

assert.equal(submit(guidedB, targetB, 'cancelled'), 'state-refusal');
console.log('B stale control: state-refusal');

const unsupported = representation(targetB);
unsupported.actions[0].method = 'DELETE';
assert.throws(() => guided(unsupported), /unsupported control/);
console.log('B unsupported control: refused locally');
