import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
const source=readFileSync(new URL('../src/hooks/useEditorialMotion.js',import.meta.url),'utf8').replace(/import .*?;/,'').replace('export function','function');
function setup(reduced) {
  let cleanup, listener, observed=0, cancelled=0, animated=0;
  const preference={matches:reduced,addEventListener:(_,fn)=>listener=fn,removeEventListener:()=>{}};
  const element={contains:()=>false,animate:()=>{animated++;return {finished:new Promise(()=>{}),cancel:()=>cancelled++}}};
  class Observer { observe(){observed++} disconnect(){} }
  const context={useEffect:fn=>cleanup=fn(),window:{matchMedia:()=>preference,IntersectionObserver:Observer},IntersectionObserver:Observer,document:{querySelectorAll:()=>[element],activeElement:null}};
  vm.createContext(context); vm.runInContext(source,context); context.useEditorialMotion('/');
  return {get animated(){return animated},get observed(){return observed},get cancelled(){return cancelled},cleanup,reduce:()=>{preference.matches=true;listener()}};
}
test('reduced motion skips both animation and reveal observers',()=>{
  const c=setup(true); assert.equal(c.animated,0); assert.equal(c.observed,0); c.cleanup();
});
test('preference changes cancel active motion, and route cleanup cancels animations',()=>{
  const c=setup(false); assert.equal(c.animated,2); assert.equal(c.observed,1); c.reduce(); assert.equal(c.cancelled,2); c.cleanup();
  const route=setup(false); route.cleanup(); assert.equal(route.cancelled,2);
});
