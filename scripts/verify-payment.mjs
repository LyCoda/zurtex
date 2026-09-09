import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
// Compile the actual route handlers with injected SDK/Response boundaries.
// No network requests or credentials: assertions inspect contract behavior.
const captured=[];
let available=true;
let session={livemode:false,mode:'payment',payment_status:'paid',status:'complete',amount_total:700,currency:'usd',metadata:{launch:'zurtex_2026'}};
const response={json(data,init={}){return {data,status:init.status??200,headers:init.headers??{},cookies:{set(...args){captured.push({cookie:args});}}};}};
globalThis.__zurtexTest={needsManualScopeCheck:()=>false,NextResponse:response,countries:[{code:'HK',name:'Hong Kong'},{code:'GB',name:'United Kingdom'}],airlines:[{code:'CX',name:'Cathay Pacific'}],createStripeClient:()=>available?{checkout:{sessions:{create:async(params,options)=>{captured.push({params,options});return {id:'cs_test_fixture',url:'https://checkout.stripe.com/test-fixture'};},retrieve:async()=>session}}}:null,createIntegrationIdentifier:()=> 'zurtex_launch_abcdefgh',PRICE_USD_CENTS:700,POLICY_VERSION:'2026-09-09',WAIT_MESSAGE:'Payment is not acceptance. Wait for your secure upload link.',stripeMode:()=> 'test'};
async function load(path) {
 const source=await readFile(path,'utf8');
 const imports=[...source.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"][^'"]+['"];?/gs)].flatMap(m=>m[1].split(',').map(x=>x.trim()).filter(Boolean));
 const body=source.replace(/import\s*\{[^}]+\}\s*from\s*['"][^'"]+['"];?/gs,'');
 const js=ts.transpileModule('const {'+imports.join(',')+'}=globalThis.__zurtexTest;\n'+body,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
 return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
}
const coverage=await load('lib/route-coverage.ts');
assert.equal(coverage.needsManualScopeCheck('HK','GB','CX'),true);
assert.equal(coverage.needsManualScopeCheck('US','CA','AC'),false);
const {POST}=await load('app/api/checkout/route.ts');
const {GET}=await load('app/api/checkout-status/route.ts');
const input={origin:'HK',destination:'GB',departure:'2099-01-01',airline:'CX',movement:'noncommercial',pet:'dog',consent:true,checkoutAttemptId:'12345678-1234-4234-8234-123456789abc'};
function req(body,origin='https://zurtex.example'){return new Request('https://zurtex.example/api/checkout',{method:'POST',headers:{origin,'content-type':'application/json'},body:JSON.stringify(body)});}
for(const [label,body] of [['null',null],['array',[]],['consent',{...input,consent:false}],['past',{...input,departure:'2000-01-01'}],['invalid date',{...input,departure:'2099-02-30'}],['same country',{...input,destination:'HK'}],['cargo',{...input,movement:'cargo'}],['bad airline',{...input,airline:'INVALID'}],['bad id',{...input,checkoutAttemptId:'bad'}]]) {
 assert.equal((await POST(req(body))).status,400,label);
}
assert.equal(captured.length,0,'invalid requests must not call Stripe');
assert.equal((await POST(req(input,'https://evil.example'))).status,403);
available=false;assert.equal((await POST(req(input))).status,503);available=true;
const valid=await POST(req({...input,amount:1}));assert.equal(valid.status,200);
const call=captured.find(x=>x.params);assert.equal(call.params.line_items[0].price_data.unit_amount,700,'server owns price');assert.equal(call.params.mode,'payment');assert.equal(call.params.payment_method_types,undefined);assert.equal(call.params.metadata.early_service_request,'accepted');assert.equal(call.params.consent_collection.terms_of_service,'required');assert.match(call.params.custom_text.submit.message,/Payment is not acceptance/);
assert.equal(captured.find(x=>x.cookie).cookie[2].httpOnly,true);
const repeat=await POST(req(input));assert.equal(repeat.status,200);assert.equal(captured.filter(x=>x.params)[1].options.idempotencyKey,call.options.idempotencyKey);
function statusReq(cookie='cs_test_fixture'){return new Request('https://zurtex.example/api/checkout-status?session_id=cs_test_fixture',{headers:{cookie:'zurtex_checkout='+cookie}});}
assert.equal((await GET(statusReq('wrong'))).status,403);
let verified=await GET(statusReq());assert.equal(verified.data.paid,true);assert.equal(verified.data.email,undefined);assert.equal(verified.headers['Cache-Control'],'no-store');
for(const patch of [{livemode:true},{amount_total:1},{currency:'hkd'},{status:'open'},{metadata:{launch:'other'}}]){const original=session;session={...session,...patch};assert.equal((await GET(statusReq())).data.paid,false);session=original;}
session={...session,payment_status:'unpaid'};verified=await GET(statusReq());assert.equal(verified.data.paid,false);assert.equal(verified.data.pending,true);
delete globalThis.__zurtexTest;
console.log('PASS: payment validation, scope, consent, server price, idempotency, cookie ownership, no PII, amount/currency/mode verification and pending payments. No real Stripe transaction performed.');
