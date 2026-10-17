// Exact unchanged teaching fences in isolated files; assertions concern scoped relationships.
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, mkdir, rm, realpath } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
const plan = JSON.parse(await readFile(new URL('./plan.json', import.meta.url), 'utf8'));
const temp = await realpath(await mkdtemp(join(tmpdir(), 'handbook-d03-replay-')));
const results = [], sources = [];
const hash = s => createHash('sha256').update(s).digest('hex');
async function extract(chapter, marker, filename) {
  const lesson = plan.reviewedChapters.find(c => c.chapter === chapter).lesson;
  const text = await readFile(lesson, 'utf8');
  const fences = [...text.matchAll(/^(?<fence>`{3,}|~{3,})(?<language>js|javascript)\n(?<body>[\s\S]*?)^\k<fence>/gm)];
  const match = fences.find(m => m.groups.body.includes(marker)); assert(match, marker);
  const path = join(temp, filename); await mkdir(dirname(path), { recursive: true });
  await writeFile(path, match.groups.body);
  sources.push({ chapter, lesson, filename, marker, sha256: hash(match.groups.body), exactFence: true });
  return filename;
}
function run(chapter, file, args=[], {flags=[],env={},exit=0,includes=[],check}={}) {
  const command = [process.execPath,...flags,join(temp,file),...args];
  const r=spawnSync(command[0],command.slice(1),{cwd:temp,env:{...process.env,...env},encoding:'utf8',timeout:10000,maxBuffer:1024*1024});
  const result={chapter,file,command:['node',...flags,`<temporary>/${file}`,...args],environmentOverrides:env,expectedExit:exit,exit:r.status,stdout:r.stdout,stderr:r.stderr,expectedOutput:includes,pass:false};
  results.push(result); assert.ifError(r.error); assert.equal(r.status,exit,`${file} ${args}: ${r.stderr}`);
  for(const s of includes) assert((r.stdout+r.stderr).includes(s),`${file}: missing ${s}`);
  check?.(r.stdout,r.stderr); result.pass=true;
}
async function modes(chapter,marker,file,values,options={}) {
  await extract(chapter,marker,file);
  for(const mode of values) run(chapter,file,mode ? [mode] : [], typeof options==='function'?options(mode):options);
}
try {
  await modes('01','isMainThread, threadId','runtime.mjs',[''],{check:o=>{const v=JSON.parse(o);assert.equal(v.isMainThread,true);assert.equal(v.threadId,0)}});
  await modes('01',"record('start')",'read-and-block.mjs',[''],{check:o=>assert.deepEqual(o.trim().split('\n').map(s=>JSON.parse(s).event),['start','submitted','blocking-segment-ended','read-observed'])});
  await extract('02','cwdResource:','launch.mjs');
  run('02','launch.mjs',['--mode=demo'],{flags:['--trace-warnings'],check:o=>{const v=JSON.parse(o);assert.deepEqual(v.applicationArguments,['--mode=demo']);assert.deepEqual(v.nodeCliArguments,['--trace-warnings']);assert.equal(v.cwd,temp);assert(v.moduleResource.endsWith('/fixture.txt'));}});
  await modes('03',"log('work-started')",'timer-and-work.mjs',[''],{check:o=>assert.deepEqual(o.trim().split('\n').map(s=>JSON.parse(s).event),['work-started','work-ended','timer-observed'])});
  await modes('03',"event: 'read-callback'",'after-read.mjs',[''],{check:o=>assert.deepEqual(o.trim().split('\n').map(s=>JSON.parse(s).event),['read-callback','immediate-after-read','timeout-after-read'])});
  run('03','after-read.mjs',['missing-fixture.txt'],{exit:1,includes:['read-failed','ENOENT']});
  await modes('03',"const mode = process.argv[2] ?? 'ref'",'timer-liveness.mjs',['ref','unref'],m=>({check:o=>{const v=o.trim().split('\n').map(s=>JSON.parse(s));assert.equal(v.length,m==='ref'?2:1);assert.equal(v[0].hasRef,m==='ref')}}));
  await extract('04',"console.log('sync-start')",'entry.cjs'); await extract('04',"console.log('sync-start')",'entry.mjs');
  for(const ext of ['cjs','mjs']) run('04',`entry.${ext}`,[],{check:o=>assert.deepEqual(o.trim().split('\n'),ext==='cjs'?['sync-start','sync-end','nextTick','promise','microtask']:['sync-start','sync-end','promise','microtask','nextTick'])});
  await modes('04',"console.log('io')",'nested-io.mjs',[''],{check:o=>assert.deepEqual(o.trim().split('\n'),['io','tick-1','promise-1','micro-1','micro-from-promise','tick-from-promise','immediate'])});
  await modes('04','let checksum = 0','batching.mjs',['micro','tick','yield'],m=>({includes:[m==='yield'?'observer 1':'observer 5000','done 5000']}));
  await modes('05','const first = new EventEmitter()','mutation-once.mjs',[''],{check:o=>assert.deepEqual(o.trim().split('\n'),['remover','later','again','remover','once outer','persistent nested','persistent outer','remaining 1'])});
  await modes('05',"captureRejections: mode === 'capture'",'async-errors.mjs',['await','capture','throw','unhandled','monitor'],m=>({exit:['throw','unhandled','monitor'].includes(m)?1:0,includes:m==='await'?['async-start\nsecond\nreturned true\nasync-end']:m==='capture'?['returned true\ncaptured async-failure']:m==='throw'?['sync-failure']:['emitted-failure']}));
  await modes('06','const original = Buffer.from','ownership.mjs',[''],{includes:['original 10,99,30,40','view 99,30','snapshot 20,30','bounded 77,4','broad 1,2,77,4,5,6']});
  await modes('06',"mode === 'partitions'",'decode.mjs',['partitions','incomplete','invalid'],m=>({includes:m==='partitions'?['partitions 256 naive-failures 248']:['strict-rejected TypeError']}));
  await modes('07',"d03-read-",'handle-reads.mjs',['normal','fail'],m=>({exit:m==='fail'?1:0,includes:['range 2 de','closed-read-rejected EBADF','temporary-files-removed',...(m==='normal'?['cursor a','eof 0']:['operation-failed simulated-consumer-failure'])]}));
  await modes('07',"d03-write-",'write-progress.mjs',['normal','zero','fail'],m=>({exit:m==='normal'?0:1,includes:[m==='normal'?'observed-file "ABCDEFG"':m==='fail'?'observed-file "AB"':'observed-file ""','closed','temporary-files-removed']}));
  await modes('08','let calls = 0, drains','writable-pressure.mjs',['respect','ignore','fail']);
  await modes('08',"['bytes', 'objects', 'text']",'threshold-units.mjs',['bytes','objects','text']);
  await modes('08','let owned = true','writable-lifecycle.mjs',['normal','destroy','final-fail','no-close']);
  await modes('09',"['normal', 'source', 'transform', 'sink', 'flush']",'pipeline-outcomes.mjs',['normal','source','transform','sink','flush']);
  await modes('09','let finalized = false','pipeline-abort.mjs',['normal','abort']);
  await modes('09',"['normal', 'premature', 'wait-abort']",'finished-observation.mjs',['normal','premature','wait-abort']);
  await extract('10',"derive('derive-A')",'pool-contend.mjs');
  for(const size of ['1','4']) run('10','pool-contend.mjs',[],{env:{UV_THREADPOOL_SIZE:size},check:o=>{const v=JSON.parse(o);assert.equal(v.events.length,3);assert(v.events.some(e=>e.name==='file-stat'&&e.isFile));}});
  await modes('10','let nativeCompleted = false','timeout-is-not-cancellation.mjs',[''],{env:{UV_THREADPOOL_SIZE:'1'},includes:['final nativeCompleted true']});
  await modes('11',"const exchange =",'clone-transfer.mjs',[''],{includes:['parentFirst 1','"senderLength":0,"aliasLength":0','"received":[4,5,6,7]']});
  await modes('11','Atomics.add(shared','shared-atomics.mjs',[''],{includes:['"observed":20000']});
  await modes('11',"deliberate-child-failure",'worker-failure.mjs',['']);
  await modes('12',"serialization: 'advanced'",'fork.mjs',[''],{includes:['"id":"task-1","total":5']});
  await modes('12',"events.push('close:'",'spawn.mjs',[''],{includes:['"exit:7:null","close:7:null"']});
  await modes('12',"__handbook_missing_executable_20261013__",'missing.mjs',[''],{includes:['error:ENOENT'],check:o=>assert(!o.includes('exit:'))});
  await modes('12','respondingPids: ids.size','cluster.mjs',['']);
  for(const f of ['counter.cjs','counter.mjs','demo.mjs']) await extract('13',`// cache/${f}`,`cache/${f}`);
  run('13','cache/demo.mjs',[],{includes:['"cjsSame":true','"esmSame":true','"esmVariantCount":2']});
  await modes('14','const count = globalThis.retained.length','retention.mjs',[''],{flags:['--expose-gc']});
  await modes('14','const bytes = 32 * 1024','external.mjs',['']);
  for(const [marker,file] of [['const seen = [];','isolation'],['const snapshot = als.run','emitter'],["new AsyncResource('EducationalJob')",'resource'],["id: 'explicit-A'",'worker'],["mutable.id = 'changed'",'mutation']]) await modes('15',marker,`als-${file}.mjs`,['']);
  for(const [marker,file] of [["['microtask', 'beforeExit:0'",'events'],['const forced = spawnSync','exit'],['const cases = [','failures'],['let acceptRequest;','drain'],['const watchdog =','signal'],['const sockets = new Set()','deadline']]) await modes('16',marker,`shutdown-${file}.mjs`,['']);
  for(const [marker,file] of [['const h = monitorEventLoopDelay','delay'],['const child = spawnSync(','blocking-native'],["Profiler.enable",'profiler'],["channel('handbook-d03-c17:demo')",'channel']]) await modes('17',marker,`diagnostic-${file}.mjs`,['']);
  await modes('18','const dataView = new DataView','integrated-transfer.mjs',['']);
  await modes('18','let committed = 0','integrated-shutdown.mjs',['']);
  const evidence={date:new Date().toISOString(),baseline:plan.baseline,environment:{node:process.version,v8:process.versions.v8,uv:process.versions.uv,openssl:process.versions.openssl,platform:process.platform,arch:process.arch},scope:'Focused exact-fence replays across all 18 chapters, not every example/exercise. New Node v24/macOS observations do not revalidate historical v22/Linux or v26/macOS numerical claims. Synthetic local files, threads, processes and loopback sockets only. Expected nonzero child outcomes are checked failures, not business successes. No production performance, rollback, complete memory bound, portability or learner-competency claim.',sources,results};
  if(process.argv.includes('--record')) await writeFile(new URL('./lab-replay.json',import.meta.url),JSON.stringify(evidence,null,2)+'\n');
  console.log(`PASS: ${results.length}/${results.length} focused expected-outcome replays across ${new Set(results.map(r=>r.chapter)).size} chapters`);
} finally {await rm(temp,{recursive:true,force:true});}
