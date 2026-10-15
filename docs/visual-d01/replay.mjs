// Bounded D01 educational replay. Extract unchanged lesson examples, never production code.
import assert from 'node:assert/strict';
import {readFile, writeFile, mkdtemp, rm} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join, resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)), '../..');
process.chdir(root);
const plan=JSON.parse(await readFile('docs/visual-d01/plan.json','utf8'));
const temp=await mkdtemp(join(tmpdir(),'handbook-d01-replay-'));
const results=[];
async function check(chapter,marker,name,assertions,prefix='') {
  const lesson=plan.reviewedChapters.find(c=>c.chapter===chapter).lesson;
  const text=await readFile(lesson,'utf8');
  const blocks=[...text.matchAll(/^```ts\n([\s\S]*?)^```/gm)].map(m=>m[1]);
  const block=blocks.find(s=>s.includes(marker)); assert(block,marker);
  const file=join(temp,`${name}.ts`);
  await writeFile(file,`import assert from 'node:assert/strict';\n${prefix}\n${block}\n${assertions}\nconsole.log('${name}: PASS');\n`);
  const r=spawnSync(process.execPath,['--experimental-transform-types',file],{encoding:'utf8',timeout:5000});
  assert.ifError(r.error); assert.equal(r.status,0,r.stderr);
  results.push({name,chapter,lesson,marker,command:['node','--experimental-transform-types',`<temporary>/${name}.ts`],exit:r.status,stdout:r.stdout,stderr:r.stderr,assertions});
}
try {
 await check('02','class RingQueue','ring-wrap',`const q=new RingQueue<string>(2); q.enqueue('A'); q.enqueue('B'); assert.equal(q.dequeue(),'A'); q.enqueue('C'); assert.equal(q.size,2); assert.throws(()=>q.enqueue('D'),/queue full/); assert.equal(q.dequeue(),'B'); assert.equal(q.dequeue(),'C'); assert.equal(q.size,0);`);
 await check('03','class MinHeap','heap-order',`const h=new MinHeap(); for(const v of [5,2,9,1]) h.push(v); assert.equal(h.peek(),1); assert.deepEqual([h.pop(),h.pop(),h.pop(),h.pop()],[1,2,5,9]);`);
 await check('03','function topoOrder','dag-order',`const g:Graph=new Map([['A',['C']],['B',['C']],['C',['D']],['D',[]]]); assert.deepEqual(topoOrder(g),['A','B','C','D']); g.set('D',['A']); assert.throws(()=>topoOrder(g),/Dependency cycle/);`, 'type Graph = Map<string,string[]>;');
 await check('04','function lowerBound','lower-bound',`for(const [target,expected] of [[2,1],[6,4],[10,5]]) assert.equal(lowerBound([1,2,2,5,9],target),expected); assert.equal(lowerBound([],2),0);`);
 await check('10','function gate()','controlled-race',`const logs:unknown[]=[]; const prior=console.log; console.log=(value)=>{logs.push(value)}; await demonstrateRace(); console.log=prior; assert.deepEqual(logs,[{results:[true,true],remaining:-1}]);`);
 await check('12','type Status =','terminal-attempts',`const cases:[Status,Event,Status][]=[['queued','start','running'],['queued','cancel','cancelled'],['running','complete','succeeded'],['running','fail','failed'],['running','cancel','cancelled']]; for(const [s,e,next] of cases) assert.deepEqual(transition(s,e),{ok:true,status:next}); for(const s of ['succeeded','failed','cancelled'] as Status[]) for(const e of ['start','complete','fail','cancel'] as Event[]) assert.deepEqual(transition(s,e),{ok:false,reason:'invalid_transition',status:s});`);
 const evidence={date:new Date().toISOString(),baseline:plan.baseline,environment:{node:process.version,platform:process.platform,arch:process.arch,v8:process.versions.v8},scope:'Six bounded replays of unchanged TypeScript teaching examples using native TypeScript transformation (experimental flag; no type checking). Assertions cover pictured operations and relevant rejection paths, not all chapter exercises, models, performance, OS/GC guarantees or learner competence.',results};
 if(process.argv.includes('--record')) await writeFile('docs/visual-d01/lab-replay.json',JSON.stringify(evidence,null,2)+'\n');
 console.log(`PASS: ${results.length}/6 D01 educational example replays`);
} finally {await rm(temp,{recursive:true,force:true});}
