import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync(new URL('../src/lib/submit.js', import.meta.url), 'utf8').replace(/import \{ SITE \} from .*?;/, '').replace('import.meta.env.VITE_WEB3FORMS_KEY', 'configuredKey').replace('export async function', 'async function').replace('export const KEY', 'const KEY');
function setup(key, fetch) {
  const context = { AbortController, setTimeout, clearTimeout, configuredKey:key, SITE:{email:'test@example.com',web3formsKey:''}, fetch, window:{location:{href:''}} };
  vm.createContext(context); vm.runInContext(source, context);
  return context;
}
test('requires an explicit delivery confirmation', async () => {
  const c=setup('test-key',async()=>({ok:true,json:async()=>({success:true})}));
  assert.equal(await c.submitForm('Enquiry',{name:'Test'}),'sent');
  for (const response of [{ok:true,json:async()=>({})},{ok:false,json:async()=>({success:true})},{ok:true,json:async()=>{throw Error('bad JSON')}}]) {
    c.fetch=async()=>response; await assert.rejects(c.submitForm('Enquiry',{}));
  }
});
test('network errors stay errors', async()=>{
  const c=setup('test-key',async()=>{throw Error('offline')});
  await assert.rejects(c.submitForm('Enquiry',{}),/check your connection/);
});
test('unconfigured delivery opens an encoded email draft, never reports sent', async()=>{
  const c=setup('',()=>{throw Error('fetch must not run')});
  assert.equal(await c.submitForm('A & B',{message:'Line 1\nLine 2'}),'mailto');
  const url=new URL(c.window.location.href);
  assert.equal(url.searchParams.get('subject'),'A & B');
  assert.equal(url.searchParams.get('body'),'message: Line 1\nLine 2');
});
