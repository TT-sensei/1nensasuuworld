const NAVI='https://tt-sensei.github.io/navi-character-/assets/web/';
const FANTASY=NAVI+'fantasy/';
const HEROES=[['riku','りく','riku-ninja','riku-ninja'],['sora','そら','sora-swordsman','sora-swordsman'],['kai','かい','kai-mage','kai-mage'],['saku','さく','saku-cleric-healer','saku-cleric'],['tsuki','つき','tsuki-archer','tsuki-archer'],['nami','なみ','nami-guardian-knight','nami-knight']];
const STAGES=[
 {id:'unit1',name:'はじまりの村',desc:'1〜10の かず',bg:'grassland',color:'green',kind:'count'},
 {id:'unit2',name:'10の神殿',desc:'10を つくる',bg:'ruins',color:'orange',kind:'make10'},
 {id:'unit3',name:'なかまの森',desc:'かずの ぶんかい',bg:'forest',color:'green',kind:'split'},
 {id:'unit4',name:'たし算火山',desc:'たし算',bg:'volcano',color:'red',kind:'add'},
 {id:'unit5',name:'ひき算どうくつ',desc:'ひき算',bg:'cave',color:'purple',kind:'sub'},
 {id:'unit6',name:'ことばの町',desc:'式を たてる文章もんだい',bg:'town',color:'blue',kind:'word'}
];
const ZAKO_BASE=["happa-squirrel-leafy","komorin-little-night-bat","purun-little-magic-slime","ember-frost-pup","sakura-snow-puff","star-bat","night-snow-puff","sunset-puru","mizutama-kappa","lantern-firefly","cloud-rain-rabbit","pebble-ram","rainbow-shell-snail","bubblefin-frog","ribbon-tailed-mouse","cobalt-blade-mantis","frostfang-weasel","thunderclaw-ram","skyfin-shark","lantern-eye-moth","pond-mirror-spirit","candy-coral-slug","mossy-porcupine","steam-sprocket-mole"];
const ZAKO_EVOLVED=["happa-squirrel-leafy-evolved","komorin-little-night-bat-evolved","purun-little-magic-slime-evolved","ember-frost-pup-evolved","sakura-snow-puff-evolved","star-bat-evolved","night-snow-puff-evolved","sunset-puru-evolved","mizutama-kappa-evolved","lantern-firefly-evolved","cloud-rain-rabbit-evolved","pebble-ram-evolved","rainbow-shell-snail-evolved","bubblefin-frog-evolved","candy-coral-slug-evolved","cobalt-blade-mantis-evolved","frostfang-weasel-evolved","lantern-eye-moth-evolved","mossy-porcupine-evolved","pond-mirror-spirit-evolved","ribbon-tailed-mouse-evolved","skyfin-shark-evolved","thunderclaw-ram-evolved","steam-sprocket-mole-evolved"];
const ZAKO=[...ZAKO_BASE,...ZAKO_EVOLVED];
// この1年生サイトは、ナビキャラカタログのモンスターグループ1だけを使用する。
const ZAKO_STAGE_POOLS=[ZAKO_BASE.slice(0,12),ZAKO_BASE.slice(12),ZAKO_EVOLVED.slice(0,12),ZAKO_EVOLVED.slice(12)];
const MID=["aqua-slime-king","forest-horn-king","autumn-horn-king","moon-crystal-golem","aurora-slime-king","prism-crystal-golem"];
const BOSS=["azure-sky-dragon","crimson-inferno-dragon","noxstella-star-eater","verdant-shell-titan","void-moon-wyvern","nightveil-raven-king","ironclock-colossus"];
const MONSTER_NAMES={"happa-squirrel-leafy":"はっぱリス","komorin-little-night-bat":"こもりんナイトバット","purun-little-magic-slime":"ぷるんスライム","ember-frost-pup":"エンバーフロストパップ","sakura-snow-puff":"さくらスノーパフ","star-bat":"スターバット","night-snow-puff":"ナイトスノーパフ","sunset-puru":"サンセットぷる","mizutama-kappa":"みずたまカッパ","lantern-firefly":"ランタンホタル","cloud-rain-rabbit":"くもあめウサギ","pebble-ram":"こいしラム","rainbow-shell-snail":"レインボーシェル・スネイル","bubblefin-frog":"バブルフィンカエル","ribbon-tailed-mouse":"リボンテイルねずみ","cobalt-blade-mantis":"コバルトブレードカマキリ","frostfang-weasel":"フロストファングイタチ","thunderclaw-ram":"サンダークローラム","skyfin-shark":"スカイフィンシャーク","lantern-eye-moth":"ランタンアイモス","pond-mirror-spirit":"みずうみミラー精霊","candy-coral-slug":"キャンディコーラルナメクジ","mossy-porcupine":"モッシーヤマアラシ","steam-sprocket-mole":"スチームスプロケット・モグラ","happa-squirrel-leafy-evolved":"はっぱリス・エボル","komorin-little-night-bat-evolved":"こもりんナイトバット・エボル","purun-little-magic-slime-evolved":"ぷるんスライム・エボル","ember-frost-pup-evolved":"エンバーフロストパップ・エボル","sakura-snow-puff-evolved":"さくらスノーパフ・エボル","star-bat-evolved":"スターバット・エボル","night-snow-puff-evolved":"ナイトスノーパフ・エボル","sunset-puru-evolved":"サンセットぷる・エボル","mizutama-kappa-evolved":"みずたまカッパ・エボル","lantern-firefly-evolved":"ランタンホタル・エボル","cloud-rain-rabbit-evolved":"くもあめウサギ・エボル","pebble-ram-evolved":"こいしラム・エボル","rainbow-shell-snail-evolved":"レインボーシェル・スネイル・エボル","bubblefin-frog-evolved":"バブルフィンカエル・エボル","candy-coral-slug-evolved":"キャンディコーラルナメクジ・エボル","cobalt-blade-mantis-evolved":"コバルトブレードカマキリ・エボル","frostfang-weasel-evolved":"フロストファングイタチ・エボル","lantern-eye-moth-evolved":"ランタンアイモス・エボル","mossy-porcupine-evolved":"モッシーヤマアラシ・エボル","pond-mirror-spirit-evolved":"みずうみミラー精霊・エボル","ribbon-tailed-mouse-evolved":"リボンテイルねずみ・エボル","skyfin-shark-evolved":"スカイフィンシャーク・エボル","thunderclaw-ram-evolved":"サンダークローラム・エボル","steam-sprocket-mole-evolved":"スチームスプロケット・モグラ・エボル","aqua-slime-king":"アクアスライム王（ボス）","forest-horn-king":"森のホーンキング（ボス）","autumn-horn-king":"オータムホーンキング（ボス）","moon-crystal-golem":"ムーンクリスタルゴーレム（ボス）","aurora-slime-king":"オーロラスライムキング（ボス）","prism-crystal-golem":"プリズムクリスタルゴーレム（ボス）","azure-sky-dragon":"蒼天ドラゴン（ボス）","crimson-inferno-dragon":"深紅の魔獣王（ボス）","noxstella-star-eater":"星喰いのノクステラ（ボス）","verdant-shell-titan":"翠緑シェルタイタン（ボス）","void-moon-wyvern":"ヴォイドムーンワイバーン（ボス）","nightveil-raven-king":"ナイトヴェールレイヴンキング（ボス）","ironclock-colossus":"アイアンクロック・コロッサス（ボス）"};
const MONSTER_CATEGORY=Object.fromEntries([...ZAKO_BASE.map(x=>[x,'zako']),...ZAKO_EVOLVED.map(x=>[x,'zako-evolved']),...MID.map(x=>[x,'boss']),...BOSS.map(x=>[x,'boss'])]);
const COLLECTIONS=[['calculation','計算バッジ','math/calculation'],['number-sense','数のセンス','math/number-sense'],['number-line','数直線バッジ','math/number-line'],['pattern','ならびバッジ','math/pattern'],['math-compare','くらべるバッジ','math/math-compare'],['mental-math','あたまバッジ','math/mental-math'],['math-discovery','発見バッジ','math/math-discovery'],['math-explainer','せつめいバッジ','math/math-explainer'],['measurement','はかるバッジ','math/measurement'],['classification','なかま分けバッジ','math/classification'],['logical-thinking','ろんりバッジ','math/logical-thinking'],['strategy','作戦バッジ','math/strategy'],['visualize','見える化バッジ','math/visualize'],['representation-link','つなぐバッジ','math/representation-link'],['verification','たしかめバッジ','math/verification'],['another-way','別の方法バッジ','math/another-way'],['math-prediction','予想バッジ','math/math-prediction'],['relationship','関係バッジ','math/relationship'],['reverse-thinking','ぎゃく算バッジ','math/reverse-thinking'],['simplify','かんたんバッジ','math/simplify'],['first-step','はじめのバッジ','common/first-step'],['explorer','たんけんバッジ','common/explorer'],['growth','まなびバッジ','common/growth']].map(x=>[x[0],x[1],`https://tt-sensei.github.io/edu-assets/assets/web/badges/${x[2]}/badge.webp`]);
const KEY='oneNumberFantasyState';
function fresh(){return {schemaVersion:2,selectedCharacter:0,trainingPartner:1,playerLevel:1,exp:0,supportMode:false,stageProgress:{},bossProgress:{},learningStats:{},reviewQueue:[],mastery:{},bestTimes:{},maxCombos:{},monsterBook:{},monsterDefeatCounts:{},collections:[],settings:{muted:false},totalCorrect:0,totalWrong:0,totalAttempts:0,clearCount:0,maxCombo:0,lastStage:null,repeatCount:0};}
let state=(()=>{try{return {...fresh(),...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(e){return fresh()}})();
let audioCtx;
function beep(kind='correct'){if(state.settings?.muted)return;try{audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();const notes=kind==='wrong'?[220,145]:kind==='special'?[523,784,1047]:[659,880];notes.forEach((f,i)=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain(),t=audioCtx.currentTime+i*.09;o.type=kind==='wrong'?'triangle':'sine';o.frequency.value=f;g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.001,t+.18);o.connect(g).connect(audioCtx.destination);o.start(t);o.stop(t+.19)})}catch(e){}}
document.addEventListener('click',e=>{let choice=e.target.closest('.choice');if(!choice)return;let q=battle?.q||trainingQ;beep(Number(choice.textContent)===q?.answer?'correct':'wrong')});

function save(){localStorage.setItem(KEY,JSON.stringify(state));updateTop()}
function updateTop(){el('lv').textContent=state.playerLevel;el('exp').textContent=state.exp;el('masters').textContent=Object.values(state.mastery).filter(Boolean).length;el('levelText').textContent='Lv.'+state.playerLevel;el('expText').textContent=state.exp+' / '+(state.playerLevel*100)+' EXP';el('expBar').style.width=Math.min(100,state.exp/(state.playerLevel*100)*100)+'%'}
function el(id){return document.getElementById(id)}
function show(id){document.querySelectorAll('.screen').forEach(x=>x.classList.toggle('active',x.id===id));if(id==='stages')renderStages();if(id==='map')renderMap();if(id==='book')renderBook();if(id==='collections')renderCollections();if(id==='record')renderRecord();if(id==='settings')renderSettings();window.scrollTo(0,0)}
function img(src){let i=document.createElement('img');i.src=src;return i}
function renderNavi(){let navis=el('navis');navis.innerHTML='';navis.classList.add('navis-home-empty');let cta=document.querySelector('#home .menu-btn.blue');if(cta){cta.classList.add('home-cta');cta.innerHTML='🗺️ 冒険をはじめる<small>ステージに ちょうせん</small>'}el('trainingNavis').innerHTML=HEROES.slice(1,4).map(x=>`<img src="${NAVI}characters/${x[0]}/expressions/01-normal-smile.webp">`).join('')}
function renderCharacterSelect(){let home=el('home'),hero=el('navis'),old=el('characterSelectPanel');if(old)old.remove();let panel=document.createElement('div');panel.id='characterSelectPanel';panel.className='panel';panel.innerHTML='<div class="heading"><h2>⚔️ たたかう なかまを えらぼう</h2><span id="selectedHeroLabel" class="tag"></span></div><div id="characterSelect" class="character-select"></div>';let style=document.createElement('style');style.textContent='.character-select{display:grid;grid-template-columns:repeat(6,1fr);gap:6px}.character-pick{background:#fff;border:3px solid transparent;border-radius:14px;padding:5px 3px;font-weight:900;color:#334b86}.character-pick.selected{border-color:#f3b63f;background:#fff8dc;box-shadow:0 3px #d6a63b}.character-pick img{width:100%;height:78px;object-fit:contain;display:block}.character-pick small{font-size:.72rem}@media(max-width:500px){.character-select{grid-template-columns:repeat(3,1fr)}.character-pick img{height:64px}}';document.head.appendChild(style);hero.parentElement.after(panel);el('characterSelect').innerHTML=HEROES.map((x,i)=>`<button class="character-pick ${i===state.selectedCharacter?'selected':''}" onclick="selectCharacter(${i})"><img src="${FANTASY}${x[2]}.webp"><small>${x[1]}</small></button>`).join('');el('selectedHeroLabel').textContent=HEROES[state.selectedCharacter][1]}
function selectCharacter(i){state.selectedCharacter=i;save();renderCharacterSelect()}
function renderStages(){el('stageGrid').innerHTML=STAGES.map((s,i)=>{let p=state.stageProgress[s.id]||{};return `<button class="stage-btn ${s.color} ${i>0&&!state.stageProgress[STAGES[i-1].id]?.cleared?'locked':''}" onclick="startBattle('${s.id}')">${i===5?'🏘️':'🗺️'} <b>${s.name}</b><small>${s.desc}</small><small>${p.cleared?'✅ クリア '+(p.clears||1)+'回':'▶ ちょうせんする'}</small></button>`}).join('')}
function choices(q){let set=new Set([q.answer]);while(set.size<4){let n=q.answer+Math.floor(Math.random()*7)-3;if(n>=0&&n<=q.max)set.add(n);else set.add(Math.floor(Math.random()*(q.max+1)))}return [...set].sort(()=>Math.random()-.5)}
function visualItems(emoji,n){return emoji.repeat(Math.max(0,n))}
function questionLayout(equation,hint,prompt){return `<span class="number-equation">${equation}</span>${hint?`<span class="visual-hint" aria-hidden="true">${hint}</span>`:''}${prompt?`<span class="question-prompt">${prompt}</span>`:''}`}
let battle=null,battleClock=null;
/* ことばの町は、文から式をつくり、答えまで出す二段構えのバトル。 */
function questionFor(kind){
 let a,b,item=['🍎','⭐','🍪','🔴'][Math.floor(Math.random()*4)];
 if(kind==='count'){
  let mode=Math.random();
  if(mode<.55){let n=1+Math.floor(Math.random()*10),visual=item.repeat(n);return {id:'count-'+n,text:`${item}が ${n}こ。ぜんぶで いくつ？`,html:`<span class="visual-hint">${visual}</span><span class="question-prompt">なんこ あるかな？</span>`,answer:n,max:10}}
  if(mode<.75){a=2+Math.floor(Math.random()*8);return {id:`sequence-next-${a}`,text:`${a-1} → ${a} → ❓`,html:`<span class="number-equation">${a-1} → ${a} → ?</span><span class="question-prompt">つぎの かずは？</span>`,answer:a+1,max:10}}
  if(mode<.88){a=1+Math.floor(Math.random()*8);return {id:`sequence-middle-up-${a}`,text:`${a} → ❓ → ${a+2}`,html:`<span class="number-equation">${a} → ? → ${a+2}</span><span class="question-prompt">まんなかの かずは？</span>`,answer:a+1,max:10}}
  a=2+Math.floor(Math.random()*8);return {id:`sequence-middle-${a}`,text:`${a+1} → ❓ → ${a-1}`,html:`<span class="number-equation">${a+1} → ? → ${a-1}</span><span class="question-prompt">まんなかの かずは？</span>`,answer:a,max:10};
 }
 if(kind==='make10'){a=1+Math.floor(Math.random()*9);return {id:`make10-${a}`,text:`${a}と あわせて 10になる かずは？`,answer:10-a,max:10}}
 if(kind==='split'){a=2+Math.floor(Math.random()*8);b=Math.floor(Math.random()*(a-1))+1;return {id:`split-${a}-${b}`,text:`${a}は ${b}と いくつ？`,answer:a-b,max:10}}
 if(kind==='add'){a=Math.floor(Math.random()*9)+1;b=Math.floor(Math.random()*9)+1;return {id:`add-${a}-${b}`,text:`${a} + ${b} = ?`,answer:a+b,max:18}}
 if(kind==='sub'){a=Math.floor(Math.random()*10)+5;b=Math.floor(Math.random()*5)+1;return {id:`sub-${a}-${b}`,text:`${a} − ${b} = ?`,answer:a-b,max:14}}
 a=Math.floor(Math.random()*9)+1;b=Math.floor(Math.random()*9)+1;
 return Math.random()<.5
  ? {id:`word-add-${a}-${b}`,text:`${item}が ${a}こ。${b}こ もらいました。ぜんぶで？`,emoji:item,answer:a+b,max:18}
  : {id:`word-sub-${a}-${b}`,text:`${item}が ${a+b}こ。${b}こ たべました。のこりは？`,emoji:item,answer:a,max:18};
}

function wordStoryLayout(visuals,prompt){return `<span class="visual-hint word-visual">${visuals}</span><span class="question-prompt">${prompt}</span>`}
function visualQuestion(q){
 if(q.html)return q.html;
 let m=q.id.match(/^(make10|split|word-add|word-sub|add|sub)-([0-9]+)(?:-([0-9]+))?/);
 if(!m)return `<span class="question-prompt">${q.text}</span>`;
 let type=m[1],a=+m[2],b=+(m[3]||0),e=q.emoji||['🍎','⭐','🍪','🔴'][Math.floor(Math.random()*4)];
 if(type==='make10')return questionLayout(`${a} ＋ ? ＝ 10`,visualItems(e,a),`${a}こ あるよ。10こに するには あと いくつ？`);
 if(type==='split')return questionLayout(`${b} ＋ ? ＝ ${a}`,`${visualItems(e,b)}　｜　${visualItems(e,a-b)}`,`${a}を 2つの まとまりに わけよう`);
 if(type==='add')return questionLayout(`${a} ＋ ${b} ＝ ?`,`${visualItems(e,a)}　＋　${visualItems(e,b)}`,`${a}こ と ${b}こ。あわせて いくつ？`);
 if(type==='sub')return questionLayout(`${a} − ${b} ＝ ?`,`${visualItems(e,a)}　−　${visualItems(e,b)}`,`${a}こ から ${b}こ へらすと のこりは？`);
 if(type==='word-add')return wordStoryLayout(`<span>${visualItems(e,a)}</span><span class="word-added">${visualItems(e,b)}</span>`,q.text);
 if(type==='word-sub')return wordStoryLayout(`<span>${visualItems(e,a+b)}</span><span class="word-taken">${visualItems(e,b)} を たべたよ</span>`,q.text);
 return `<span class="question-prompt">${q.text}</span>`;
}

function wordParts(q){
 let m=q?.id?.match(/^word-(add|sub)-([0-9]+)-([0-9]+)$/);
 if(!m)return null;
 let type=m[1],a=+m[2],b=+m[3];
 return type==='add'?{left:a,operator:'+',right:b}:{left:a+b,operator:'-',right:b};
}
function formatWordInput(value){return value.replace('+',' ＋ ').replace('-',' − ')}
function renderWordControls(){
 if(!battle||battle.stage.kind!=='word')return;
 let equation=battle.wordPhase==='equation',value=battle.wordInput||'',savedEquation=!equation?formatWordInput(battle.wordExpression||''):'';
 let keys=equation?['7','8','9','+','4','5','6','-','1','2','3','back','clear','0']:['1','2','3','4','5','6','7','8','9','clear','0','back'];
 let label=key=>key==='back'?'⌫':key==='clear'?'C':key==='-'?'−':key;
 el('choices').innerHTML=`<div class="word-pad ${equation?'equation-pad':'answer-pad'}"><div class="word-step">${equation?'① 式を つくろう':'② こたえを いれよう'}</div>${savedEquation?`<div class="word-saved-equation">式　${savedEquation} ＝</div>`:''}<div class="word-input" aria-live="polite">${formatWordInput(value)||'…'}</div><div class="word-keypad">${keys.map(key=>`<button class="word-key ${key==='+'||key==='-'?'operator':''} ${key==='back'||key==='clear'?'utility':''}" onclick="wordKey('${key}')">${label(key)}</button>`).join('')}</div><button class="word-submit ${equation?'blue':'green'}" onclick="submitWordAttack()">⚔️ ${equation?'式で 攻撃！':'答えで 攻撃！'}</button></div>`;
}
function wordKey(key){
 if(!battle||battle.locked||battle.stage.kind!=='word')return;
 let value=battle.wordInput||'',equation=battle.wordPhase==='equation';
 if(key==='clear')value='';
 else if(key==='back')value=value.slice(0,-1);
 else if(equation&&(key==='+'||key==='-')){
  if(value&&!/[+-]/.test(value))value+=key;
  else return;
 }else if(equation){
  let current=value.split(/[+-]/).pop();
  if(current.length<2&&value.length<5)value+=key;
 }else if(value.length<2)value+=key;
 battle.wordInput=value;
 renderWordControls();
}
function updateBattleHud(){
 if(!battle)return;
 el('combo').textContent=battle.combo;
 el('playerHp').style.width=battle.playerHp/battle.maxPlayerHp*100+'%';
 el('playerHpText').textContent=`${battle.playerHp} / ${battle.maxPlayerHp}`;
 el('enemyHp').style.width=battle.enemyHp/battle.maxEnemyHp*100+'%';
 el('enemyHpText').textContent=`HP ${battle.enemyHp} / ${battle.maxEnemyHp}`;
}
function performAttack(){
 battle.correct++;
 battle.combo++;
 battle.maxCombo=Math.max(battle.maxCombo,battle.combo);
 state.maxCombo=Math.max(state.maxCombo,battle.maxCombo);
 let special=battle.combo%5===0;
 battle.enemyHp=Math.max(0,battle.enemyHp-(special?2:1));
 let hero=el('heroImg');
 hero.src=`${FANTASY}${special?'special/':'attack/'}${HEROES[state.selectedCharacter][3]}-${special?'special':'attack'}.webp`;
 hero.classList.remove('attack','damage');void hero.offsetWidth;hero.classList.add('attack');
 let monster=el('monsterImg');
 monster.classList.remove('special','hit');void monster.offsetWidth;monster.classList.add(special?'special':'hit');
 setTimeout(()=>monster.classList.remove('special','hit'),900);
 return special;
}
function submitWordAttack(){
 if(!battle||battle.locked||battle.stage.kind!=='word')return;
 let value=battle.wordInput||'';
 if(!value){el('feedback').textContent=battle.wordPhase==='equation'?'数字と ＋ または − を おして、式を つくろう。':'数字を おして、答えを いれよう。';return}
 if(battle.wordPhase==='equation'){
  let entered=value.match(/^(\d{1,2})([+-])(\d{1,2})$/),parts=wordParts(battle.q);
  if(!entered){el('feedback').textContent='「3 ＋ 2」のように、数字と きごうで 式を つくろう。';return}
  let left=+entered[1],operator=entered[2],right=+entered[3];
  let correct=parts&&operator===parts.operator&&((operator==='+'&&((left===parts.left&&right===parts.right)||(left===parts.right&&right===parts.left)))||(operator==='-'&&left===parts.left&&right===parts.right));
  if(!correct){answer(Number.NaN,true,'💥 文を もう一度 よんで、式を つくろう。');return}
  battle.locked=true;
  let special=performAttack();
  beep(special?'special':'correct');
  updateBattleHud();
  el('feedback').textContent=special?'✨ SPECIAL！ 式が できた！ つぎは答えで 攻撃！':'⚔️ 式で ATTACK！ つぎは答えで 攻撃！';
  battle.wordExpression=value;
  let q=battle.q;
  setTimeout(()=>{
   if(!battle||battle.q!==q||battle.wordPhase!=='equation')return;
   battle.wordPhase='answer';battle.wordInput='';battle.locked=false;renderWordControls();
  },600);
  return;
 }
 answer(Number(value),true);
}

function startBattle(stageId){
 if(battleClock){clearInterval(battleClock);battleClock=null}
 let s=STAGES.find(x=>x.id===stageId)||STAGES[0],support=state.supportMode,isBoss=stageId==='unit6',isMid=stageId==='unit5';
 let time=isBoss?(support?160:120):isMid?(support?120:90):(support?90:60);
 let stageIndex=STAGES.findIndex(x=>x.id===stageId),pool=isBoss?BOSS:isMid?MID:(ZAKO_STAGE_POOLS[stageIndex]||ZAKO);
 let monster=pool[Math.floor(Math.random()*pool.length)],monsterCategory=MONSTER_CATEGORY[monster]||'zako',maxEnemyHp=isBoss?16:5;
 battle={stage:s,monster,monsterCategory,isBoss,questionNo:0,total:10,correct:0,wrong:0,combo:0,maxCombo:0,playerHp:support?7:5,maxPlayerHp:support?7:5,enemyHp:maxEnemyHp,maxEnemyHp,started:Date.now(),time,locked:false,seen:[],support,wordPhase:s.kind==='word'?'equation':null,wordInput:'',wordExpression:''};
 el('app').style.backgroundImage=`linear-gradient(#ffffff22,#ffffff88),url('${FANTASY}backgrounds/${s.bg}.webp')`;
 el('battleTitle').textContent=s.name+(isBoss?'・大ボス戦':'・バトル');
 el('battleMode').textContent=support?'サポートON':'サポートOFF';
 el('heroName').textContent=HEROES[state.selectedCharacter][1];
 el('heroImg').src=`${FANTASY}${HEROES[state.selectedCharacter][2]}.webp`;
 el('monsterImg').src=`${FANTASY}monsters/${monsterCategory}/${monster}.webp`;
 el('monsterName').textContent=MONSTER_NAMES[monster]||monster;
 el('timer').textContent=battle.time;
 show('battle');updateBattleHud();nextQuestion();
 battleClock=setInterval(()=>{if(!battle||battle.locked)return;battle.time--;el('timer').textContent=battle.time;if(battle.time<=0)finishBattle(false,'時間切れ…')},1000);
}
function nextQuestion(){
 if(!battle)return;
 if(battle.enemyHp<=0||(!battle.isBoss&&battle.questionNo>=battle.total)){finishBattle(true,'勝利！');return}
 battle.locked=false;
 let q;
 for(let i=0;i<20;i++){q=questionFor(battle.stage.kind);if(!battle.seen.includes(q.id)||i===19)break}
 battle.q=q;battle.seen.push(q.id);battle.questionNo++;
 el('question').innerHTML=visualQuestion(q);
 el('progressText').textContent=battle.isBoss?`第 ${battle.questionNo}問`:`${battle.questionNo} / ${battle.total}`;
 el('feedback').textContent='';
 if(battle.stage.kind==='word'){battle.wordPhase='equation';battle.wordInput='';battle.wordExpression='';renderWordControls()}
 else el('choices').innerHTML=choices(q).map(n=>`<button class="choice" onclick="answer(${n})">${n}</button>`).join('');
}
function answer(n,fromPad=false,wrongMessage=''){
 if(!battle||battle.locked)return;
 battle.locked=true;
 let q=battle.q,stats=state.learningStats[q.id]||{attempts:0,correct:0,wrong:0,recentResults:[],lastAskedAt:0,lastWrongAt:0,reviewActive:false,reviewCorrectStreak:0};
 stats.attempts++;stats.lastAskedAt=Date.now();
 let correct=n===q.answer;
 if(fromPad)beep(correct?'correct':'wrong');
 stats.recentResults=(stats.recentResults||[]).slice(-4).concat(correct?1:0);
 if(correct){
  stats.correct++;stats.reviewCorrectStreak=(stats.reviewCorrectStreak||0)+1;
  state.totalCorrect++;
  let special=performAttack();
  el('feedback').textContent=special?'✨ SPECIAL！ せいかい！':'⚔️ ATTACK！ せいかい！';
  if(stats.reviewCorrectStreak>=2)stats.reviewActive=false;
  gainExp(8);
 }else{
  stats.wrong++;stats.lastWrongAt=Date.now();stats.reviewActive=true;stats.reviewCorrectStreak=0;
  state.totalWrong++;battle.wrong++;battle.combo=0;battle.playerHp--;
  el('feedback').textContent=wrongMessage||('💥 もういちど！ こたえは '+q.answer);
  let hero=el('heroImg');
  hero.src=`${FANTASY}damage/${HEROES[state.selectedCharacter][3]}-damage.webp`;
  hero.classList.remove('damage');void hero.offsetWidth;hero.classList.add('damage');
  if(!state.reviewQueue.includes(q.id))state.reviewQueue.push(q.id);
  if(battle.playerHp<=0){save();setTimeout(()=>finishBattle(false,'あと少し！ 特訓してもう一度！'),650)}
 }
 state.learningStats[q.id]=stats;state.totalAttempts++;save();updateBattleHud();
 if(battle.enemyHp<=0)return setTimeout(()=>finishBattle(true,'勝利！'),850);
 if(battle.playerHp<=0)return;
 setTimeout(nextQuestion,correct?600:900);
}

function gainExp(n){state.exp+=n;while(state.exp>=state.playerLevel*100){state.exp-=state.playerLevel*100;state.playerLevel++}}
function finishBattle(won,message){if(!battle||battle.finished)return;battle.finished=true;clearInterval(battleClock);battleClock=null;let s=battle.stage,p=state.stageProgress[s.id]||{attempts:0,clears:0},previousStage=state.lastStage;p.attempts=(p.attempts||0)+1;if(won){p.clears=(p.clears||0)+1;p.cleared=true;state.clearCount++;let repeat=s.id===previousStage?state.repeatCount+1:0;state.lastStage=s.id;state.repeatCount=repeat;let reward=repeat>=3?4:12;gainExp(reward);let key=battle.monster;state.monsterBook[key]=true;state.monsterDefeatCounts[key]=(state.monsterDefeatCounts[key]||0)+1;let unopened=COLLECTIONS.filter(x=>!state.collections.includes(x[0]));if(unopened.length){let badge=unopened[Math.floor(Math.random()*unopened.length)];state.collections.push(badge[0])}if(battle.isBoss)state.bossProgress[s.id]=true}state.stageProgress[s.id]=p;save();el('overlay').innerHTML=`<div class="battle-overlay"><div class="result-card"><div class="navis">${HEROES.slice(0,3).map(x=>`<img src="${NAVI}characters/${x[0]}/expressions/08-celebrating.webp">`).join('')}</div><h2>${message}</h2><p>${battle.isBoss?'成功攻撃 '+battle.correct+'回　ミス '+battle.wrong+'回':'正解 '+battle.correct+'問　ミス '+battle.wrong+'問'}<br>最大コンボ ${battle.maxCombo}　残りHP ${Math.max(0,battle.playerHp)}</p><p>${won?'EXPとコレクションを うけとったよ！':'まちがいは 特訓に 記録したよ。'}</p><div class="result-actions"><button class="green" onclick="closeOverlay();startTraining('wrong')">まちがえた問題を特訓する</button><button class="blue" onclick="closeOverlay();startBattle('${s.id}')">もう一度バトル</button><button class="orange" onclick="closeOverlay();show('map')">学習マップを見る</button><button class="back" onclick="closeOverlay();show('home')">ホームへ</button></div></div></div>`}
function closeOverlay(){clearInterval(battleClock);battleClock=null;el('overlay').innerHTML='';battle=null;el('app').style.backgroundImage="linear-gradient(#ffffff22,#ffffff88),url('https://tt-sensei.github.io/navi-character-/assets/web/fantasy/backgrounds/town.webp')"}
let trainingMode='auto',trainingQ;
function startTraining(mode){if(mode)trainingMode=mode;show('training');let ids=trainingMode==='wrong'?state.reviewQueue.filter(id=>state.learningStats[id]?.reviewActive):[];let source=ids.length?ids[Math.floor(Math.random()*ids.length)]:null;trainingQ=source?questionFromId(source):questionFor(STAGES[Math.floor(Math.random()*STAGES.length)].kind);el('trainingQuestion').innerHTML=visualQuestion(trainingQ);el('trainingFeedback').textContent='';el('trainingChoices').innerHTML=choices(trainingQ).map(n=>`<button class="choice" onclick="trainingAnswer(${n})">${n}</button>`).join('')}
function questionFromId(id){let m=id.match(/^(word-add|word-sub|add|sub|make10|split|count)-([0-9]+)(?:-([0-9]+))?/);if(!m)return questionFor('count');let type=m[1],a=+m[2],b=+(m[3]||0);if(type==='add')return {id,text:`${a} + ${b} = ?`,answer:a+b,max:18};if(type==='sub')return {id,text:`${a} − ${b} = ?`,answer:a-b,max:14};if(type==='word-add')return {id,text:`🍎が ${a}こ。${b}こ もらいました。ぜんぶで？`,emoji:'🍎',answer:a+b,max:18};if(type==='word-sub')return {id,text:`🍎が ${a+b}こ。${b}こ たべました。のこりは？`,emoji:'🍎',answer:a,max:18};if(type==='make10')return {id,text:`${a}と あわせて 10になる かずは？`,answer:10-a,max:10};if(type==='split')return {id,text:`${a}は ${b}と いくつ？`,answer:a-b,max:10};let item='🍎',visual=item.repeat(a);return {id,text:`${item}が ${a}こ。ぜんぶで いくつ？`,html:`<span class="visual-hint">${visual}</span><span class="question-prompt">なんこ あるかな？</span>`,answer:a,max:10}}
function trainingAnswer(n){let correct=n===trainingQ.answer;el('trainingFeedback').textContent=correct?'🌟 できた！ あとで もういちど でてくるよ。':'🍀 だいじょうぶ。こたえは '+trainingQ.answer;let s=state.learningStats[trainingQ.id]||{attempts:0,correct:0,wrong:0,recentResults:[],reviewActive:false,reviewCorrectStreak:0};s.attempts++;if(correct){s.correct++;s.reviewCorrectStreak=(s.reviewCorrectStreak||0)+1;if(s.reviewCorrectStreak>=2)s.reviewActive=false;gainExp(2)}else{s.wrong++;s.reviewActive=true;s.reviewCorrectStreak=0;if(!state.reviewQueue.includes(trainingQ.id))state.reviewQueue.push(trainingQ.id)}state.learningStats[trainingQ.id]=s;save();setTimeout(startTraining,650)}
function renderMap(){el('mapRows').innerHTML=STAGES.map(s=>{let p=state.stageProgress[s.id]||{},stats=Object.entries(state.learningStats).filter(([id])=>id.startsWith(s.kind));let a=stats.reduce((n,[,v])=>n+v.attempts,0),c=stats.reduce((n,[,v])=>n+v.correct,0),rate=a?Math.round(c/a*100):0,weak=stats.filter(([,v])=>v.reviewActive).length;return `<div class="map-row"><strong>${s.name}</strong><span class="tag ${rate>=80?'good':a?'warn':''}">${a?rate+'%':'－ データ不足'}</span><span>${p.cleared?'👑 MASTER':'未クリア'}</span><span class="map-extra">苦手 ${weak}問　${weak?'△ 特訓おすすめ':'○ もう少し'}</span></div>`}).join('')}
const STICKER_EFFECTS=['holo','rainbow','glitter','neon','aurora','prism'];
function stickerEffect(){return STICKER_EFFECTS[Math.floor(Math.random()*STICKER_EFFECTS.length)]}
function renderBook(){let all=[...ZAKO_BASE,...ZAKO_EVOLVED,...MID,...BOSS];el('bookGrid').innerHTML=all.map(m=>{let has=state.monsterBook[m],category=MONSTER_CATEGORY[m]||'zako',isBoss=category==='boss',tier=BOSS.includes(m)?'大ボス':MID.includes(m)?'中ボス':category==='zako-evolved'?'ザコ進化系':'モンスター',src=`${FANTASY}monsters/${category}/${m}.webp`;return `<div class="monster-card ${has?'sticker-monster-card':''} ${has?'':'locked'} effect-${has?stickerEffect():'none'}"><img class="${has?'sticker-monster-image':''}" loading="lazy" decoding="async" src="${src}" alt="${MONSTER_NAMES[m]||m}" onerror="this.classList.add('asset-error');this.alt='画像を読み込めませんでした'"><b>${has?(MONSTER_NAMES[m]||m):'？？？'}</b><small>${has?'撃破 '+(state.monsterDefeatCounts[m]||1)+'回':tier}</small></div>`}).join('')}
function renderCollections(){el('collectionGrid').innerHTML=COLLECTIONS.map(x=>{let has=state.collections.includes(x[0]);return `<div class="monster-card ${has?'':'locked'}"><img src="${x[2]}" onerror="this.style.display='none'"><b>${has?x[1]:'？？？'}</b><small>${has?'算数コレクション':'未獲得'}</small></div>`}).join('')}
function renderRecord(){el('recordText').innerHTML=`<div class="map-row"><strong>総問題数</strong><span>${state.totalAttempts}</span></div><div class="map-row"><strong>正解数</strong><span>${state.totalCorrect}</span></div><div class="map-row"><strong>苦手克服数</strong><span>${Object.values(state.learningStats).filter(v=>!v.reviewActive&&v.correct>=2).length}</span></div><div class="map-row"><strong>最大コンボ</strong><span>${state.maxCombo}</span></div><div class="map-row"><strong>クリア回数</strong><span>${state.clearCount}</span></div>`}
function renderSettings(){el('supportSetting').textContent=state.supportMode?'ON':'OFF';el('supportSetting').classList.toggle('on',state.supportMode);el('soundSetting').textContent=state.settings.muted?'OFF':'ON';el('soundSetting').classList.toggle('on',!state.settings.muted)}
function toggleSupport(){state.supportMode=!state.supportMode;save();el('supportBtn').textContent='🛡️ サポート '+(state.supportMode?'ON':'OFF')}
function toggleSupportSetting(){state.supportMode=!state.supportMode;save();renderSettings()}
function toggleMute(){state.settings.muted=!state.settings.muted;save();renderSettings();if(el('muteBtn'))el('muteBtn').textContent='🔊 音 '+(state.settings.muted?'OFF':'ON')}
function resetData(){if(confirm('学習記録をリセットしますか？')){state=fresh();save();location.reload()}}
document.querySelectorAll('[data-train]').forEach(b=>b.onclick=()=>{trainingMode=b.dataset.train;document.querySelectorAll('[data-train]').forEach(x=>x.classList.toggle('active',x===b));startTraining()});
renderNavi();renderCharacterSelect();updateTop();renderStages();if(location.search.includes('battle'))startBattle(new URLSearchParams(location.search).get('stage')||'unit1');
