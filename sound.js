// 算数ワールド 効果音
// sounds-recipe- の考え方を使った、短いWeb Audio効果音だけを収録。
// BGMは意図的に用意していません。音は学習の節目だけ鳴ります。
let worldAudioContext;
function playSound(id, volume=0.7){
  try{
    worldAudioContext ||= new (window.AudioContext||window.webkitAudioContext)();
    const ctx=worldAudioContext;
    if(ctx.state==='suspended') ctx.resume();
    const recipes={
      correct:[[659,0,.22,'sine',.28],[880,.1,.45,'sine',.25]],
      wrong:[[220,0,.35,'triangle',.22],[145,.18,.44,'triangle',.2]],
      decide:[[440,0,.14,'square',.14],[660,.12,.2,'square',.14]],
      clear:[[523,0,.45,'sine',.18],[659,.12,.55,'sine',.18],[784,.24,.65,'sine',.18],[1047,.36,.75,'sine',.2]],
      levelup:[[392,0,.15,'triangle',.14],[523,.12,.15,'triangle',.15],[659,.24,.15,'triangle',.16],[784,.36,.5,'triangle',.2]]
    };
    const notes=recipes[id]||recipes.decide;
    notes.forEach(([freq,start,duration,type,gain])=>{
      const osc=ctx.createOscillator(), amp=ctx.createGain();
      const t=ctx.currentTime+start;
      osc.type=type; osc.frequency.value=freq;
      amp.gain.setValueAtTime(Math.max(.01,gain*volume),t);
      amp.gain.exponentialRampToValueAtTime(.0001,t+duration);
      osc.connect(amp).connect(ctx.destination); osc.start(t); osc.stop(t+duration);
    });
  }catch(_){/* 音を使えない環境でも学習は続けられる */}
}
