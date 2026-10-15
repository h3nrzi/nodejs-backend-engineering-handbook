// Bounded checks of unchanged teaching snippets; no project implementation or type-check claim.
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const plan = JSON.parse(await readFile(new URL('./plan.json', import.meta.url), 'utf8'));
const temp = await mkdtemp(join(tmpdir(), 'handbook-d02-replay-'));
const results = [];
async function check(chapter, marker, name, assertions, prefix = '') {
  const lesson = plan.reviewedChapters.find(c => c.chapter === chapter).lesson;
  const text = await readFile(lesson, 'utf8');
  const blocks = [...text.matchAll(/^(?<fence>`{3,}|~{3,})(?<language>js|ts)\n(?<body>[\s\S]*?)^\k<fence>/gm)];
  const match = blocks.find(m => m.groups.body.includes(marker));
  assert(match, marker);
  const file = join(temp, `${name}.${match.groups.language === 'ts' ? 'mts' : 'mjs'}`);
  await writeFile(file, `import assert from 'node:assert/strict';\n${prefix}\n${match.groups.body}\n${assertions}\nconsole.log('${name}: PASS');\n`);
  const r = spawnSync(process.execPath, [file], { encoding: 'utf8', timeout: 5000 });
  assert.ifError(r.error); assert.equal(r.status, 0, r.stderr);
  results.push({ name, chapter, lesson, marker, command: ['node', `<temporary>/${name}.${match.groups.language === 'ts' ? 'mts' : 'mjs'}`], exit: r.status, stdout: r.stdout, stderr: r.stderr, assertions });
}
try {
  await check('02', 'function makeCounter()', 'closure-sharing', `assert.equal(counter.read(),2); const other=makeCounter(); assert.equal(other.read(),0); counter.increment(); assert.equal(counter.read(),3); assert.equal(other.read(),0);`);
  await check('02', 'const callbacksVar', 'loop-bindings', `assert.deepEqual(callbacksVar.map(fn=>fn()),[3,3,3]); assert.deepEqual(callbacksLet.map(fn=>fn()),[0,1,2]);`);
  await check('03', 'const meter =', 'detached-receiver', `assert.equal(meter.read(),2); assert.throws(()=>detached(),TypeError); assert.equal(detached.bind(meter)(),2);`);
  await check('04', 'const shared =', 'prototype-lookup', `assert.equal(account.role,'viewer'); assert.equal(Object.hasOwn(account,'role'),false); assert.equal('role' in account,true); assert.equal(Object.getPrototypeOf(account),shared); account.role='admin'; assert.equal(account.role,'admin'); assert.equal(shared.role,'viewer'); delete account.role; assert.equal(account.role,'viewer'); assert.equal(account.missing,undefined);`);
  await check('05', 'const sorted =', 'shallow-sort', `assert.notEqual(original,sorted); assert.equal(sorted[0],original[1]); assert.equal(sorted[1],original[0]); assert.deepEqual(original.map(x=>x.score),[3,9]); assert.deepEqual(sorted.map(x=>x.score),[9,3]);`);
  await check('07', 'function dangerous()', 'finally-outcomes', `assert.equal(result(),'first'); assert.equal(dangerous(),'overridden');`);
  await check('08', 'const outer =', 'promise-adoption', `assert.equal(await outer,'ready'); let complete; const i=new Promise(r=>complete=r); let rejectOuter; const o=new Promise((resolve,reject)=>{rejectOuter=reject;resolve(i)}); let seen=false; o.then(()=>{seen=true}); await Promise.resolve(); assert.equal(seen,false); rejectOuter(new Error('ignored')); complete('locked'); assert.equal(await o,'locked');`);
  await check('08', 'console.log("A")', 'executor-reaction-order', `await p; console.log=priorLog; assert.deepEqual(logs,['A','B','C','D']);`, `const logs=[]; const priorLog=console.log; console.log=(x)=>logs.push(x);`);
  await check('08', 'async function withResource', 'await-before-cleanup', `const events=[]; assert.equal(await withResource(async()=>({perform:async()=>{await Promise.resolve();events.push('perform');return 7},close:async()=>{events.push('close')}})),7); assert.deepEqual(events,['perform','close']); await assert.rejects(()=>withResource(async()=>({perform:async()=>{throw Error('primary')},close:async()=>{throw Error('cleanup')}})),/cleanup/);`);
  await check('09', 'async function step(', 'cooperative-abort', `const c=new AbortController(); let effect=0; const pending=step(c.signal,async()=>{effect++;c.abort(new Error('stopped'));return 'done'}); await assert.rejects(()=>pending,/stopped/); assert.equal(effect,1); let called=false; await assert.rejects(()=>step(c.signal,async()=>{called=true}),/stopped/); assert.equal(called,false);`);
  await check('10', 'async function processAll', 'consumer-pacing', `const events=[]; let active=0; async function* source(){events.push('pull1');yield 1;events.push('pull2');yield 2;} await processAll(source(),async n=>{active++;assert.equal(active,1);events.push('save'+n);await Promise.resolve();active--;events.push('done'+n)},new AbortController().signal); assert.deepEqual(events,['pull1','save1','done1','pull2','save2','done2']);`);
  await check('10', 'async function takeFirst', 'iterator-close', `let closed=false; async function* values(){try{yield 1;yield 2}finally{await Promise.resolve();closed=true}} assert.equal(await takeFirst(values()),1); assert.equal(closed,true);`);
  await check('11', 'type Identified =', 'structural-runtime-identity', `assert.equal(input,record); assert.equal(input.category,'service');`);
  await check('13', 'function getProperty<', 'generic-runtime-access', `assert.equal(isActive,true); assert.equal(getProperty(entry,'id'),'a');`);
  await check('15', 'function parseCustomerInput', 'parser-paths', `const raw={name:' Ada ',age:30,extra:true}; const parsed=parseCustomerInput(raw); assert.deepEqual(parsed,{name:'Ada',age:30}); assert.notEqual(raw,parsed); assert.equal(raw.name,' Ada '); for(const bad of [null,[],1,{name:'',age:20},{name:3,age:20}]) assert.throws(()=>parseCustomerInput(bad),TypeError); for(const age of [-1,131,1.5,NaN,'30']) assert.throws(()=>parseCustomerInput({name:'Ada',age}),RangeError); assert.equal(parseCustomerInput({name:'A',age:0}).age,0); assert.equal(parseCustomerInput({name:'A',age:130}).age,130);`);
  await check('16', 'async function collect(', 'two-rejection-layers', `const entries=await collect([async()=>({kind:'rejected',recipientId:'r1',reason:'policy'}),async()=>{throw new Error('transport')}]); assert.equal(entries[0].status,'fulfilled'); assert.equal(entries[0].value.kind,'rejected'); assert.equal(entries[1].status,'rejected'); assert.equal(entries[1].reason.message,'transport'); await assert.rejects(()=>collect([()=>{throw Error('sync')}]),/sync/);`);
  const evidence = { date: new Date().toISOString(), baseline: plan.baseline, environment: { node: process.version, v8: process.versions.v8, platform: process.platform, arch: process.arch }, scope: 'Sixteen bounded replays of unchanged JS/TS teaching blocks. Native Node type stripping is not TypeScript type checking. No compiler is installed in the repository; static claims are documentation-reviewed, not compiler-verified. No all-lesson execution, timer scheduling, remote cancellation, production implementation or learner assessment claim.', results };
  if (process.argv.includes('--record')) await writeFile(new URL('./lab-replay.json', import.meta.url), JSON.stringify(evidence, null, 2)+'\n');
  console.log(`PASS: ${results.length}/16 bounded D02 teaching replays`);
} finally { await rm(temp, { recursive: true, force: true }); }
