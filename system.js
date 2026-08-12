// 算数ワールド 共通システム
// 既存の保存キーを維持し、学習の積み上げと街の発展をつなぎます。

const CITY_BUILDINGS = [
  { name:"石のモニュメント", cost:10, requiredLevel:1, requiredMastery:0 },
  { name:"キャンプ場", cost:20, requiredLevel:2, requiredMastery:0 },
  { name:"きれいな泉", cost:35, requiredLevel:3, requiredMastery:5 },
  { name:"丸太の小屋", cost:50, requiredLevel:4, requiredMastery:10 },
  { name:"村の広場", cost:80, requiredLevel:5, requiredMastery:18 },
  { name:"レンガの家", cost:120, requiredLevel:7, requiredMastery:28 },
  { name:"にぎやかな市場", cost:200, requiredLevel:10, requiredMastery:40 },
  { name:"大きな時計塔", cost:350, requiredLevel:15, requiredMastery:55 },
  { name:"お城の門", cost:500, requiredLevel:20, requiredMastery:72 },
  { name:"算数キングダム城", cost:1000, requiredLevel:30, requiredMastery:90 }
];

const WORLD_KEYS = ["exp","level","energy","cityLevel","companions",
  "correctAnswers","attempts","streak","bestStreak","lastPlayed","unitProgress"];

function numberValue(value, fallback=0) {
  const n=Number(value);
  return Number.isFinite(n)&&n>=0 ? Math.floor(n) : fallback;
}
function readJson(key, fallback) {
  try { const value=JSON.parse(localStorage.getItem(key)); return value ?? fallback; }
  catch (_) { return fallback; }
}
function blankUnitProgress() {
  return { correct:0, attempts:0, streak:0, bestStreak:0, mastery:0 };
}
function normalizeUnitProgress(value) {
  const source=value&&typeof value==="object"?value:{};
  const result={};
  for(let i=1;i<=6;i++) {
    const key="unit"+i, item=source[key]&&typeof source[key]==="object"?source[key]:{};
    result[key]={
      correct:numberValue(item.correct),
      attempts:numberValue(item.attempts),
      streak:numberValue(item.streak),
      bestStreak:numberValue(item.bestStreak),
      mastery:Math.min(100,numberValue(item.mastery))
    };
  }
  return result;
}
function loadData() {
  const companions=readJson("companions",[]);
  return {
    // 旧バージョンの5つの保存キーは変更しない
    exp:numberValue(localStorage.getItem("exp")),
    level:Math.max(1,numberValue(localStorage.getItem("level"),1)),
    energy:numberValue(localStorage.getItem("energy")),
    cityLevel:Math.min(CITY_BUILDINGS.length,numberValue(localStorage.getItem("cityLevel"))),
    companions:Array.isArray(companions)?companions:[],
    correctAnswers:numberValue(localStorage.getItem("correctAnswers")),
    attempts:numberValue(localStorage.getItem("attempts")),
    streak:numberValue(localStorage.getItem("streak")),
    bestStreak:numberValue(localStorage.getItem("bestStreak")),
    lastPlayed:localStorage.getItem("lastPlayed")||"",
    unitProgress:normalizeUnitProgress(readJson("unitProgress",{}))
  };
}
function saveData(data) {
  const safe={
    ...data,
    exp:numberValue(data.exp), level:Math.max(1,numberValue(data.level,1)),
    energy:numberValue(data.energy),
    cityLevel:Math.min(CITY_BUILDINGS.length,numberValue(data.cityLevel)),
    companions:Array.isArray(data.companions)?data.companions:[],
    correctAnswers:numberValue(data.correctAnswers), attempts:numberValue(data.attempts),
    streak:numberValue(data.streak), bestStreak:numberValue(data.bestStreak),
    lastPlayed:data.lastPlayed||"", unitProgress:normalizeUnitProgress(data.unitProgress)
  };
  try {
    localStorage.setItem("exp",String(safe.exp));
    localStorage.setItem("level",String(safe.level));
    localStorage.setItem("energy",String(safe.energy));
    localStorage.setItem("cityLevel",String(safe.cityLevel));
    localStorage.setItem("companions",JSON.stringify(safe.companions));
    localStorage.setItem("correctAnswers",String(safe.correctAnswers));
    localStorage.setItem("attempts",String(safe.attempts));
    localStorage.setItem("streak",String(safe.streak));
    localStorage.setItem("bestStreak",String(safe.bestStreak));
    localStorage.setItem("lastPlayed",safe.lastPlayed);
    localStorage.setItem("unitProgress",JSON.stringify(safe.unitProgress));
  } catch (_) {}
}
function currentUnitId() {
  const match=location.pathname.match(/unit([1-6])\.html/);
  return match ? "unit"+match[1] : null;
}
function updateUnitProgress(data, correct) {
  const id=currentUnitId();
  if(!id) return;
  const item=data.unitProgress[id]||blankUnitProgress();
  item.attempts+=1;
  if(correct) {
    item.correct+=1; item.streak+=1;
    item.bestStreak=Math.max(item.bestStreak,item.streak);
  } else item.streak=0;
  // 1単元20問を目安に、学習の積み上がりを街の発展へ反映
  item.mastery=Math.min(100,Math.round(item.correct/20*100));
  data.unitProgress[id]=item;
}
function getTotalMastery(data) {
  const values=Object.values(data.unitProgress||{});
  return values.length ? Math.round(values.reduce((sum,item)=>sum+numberValue(item.mastery),0)/values.length) : 0;
}
function addRewards(expAmount,energyAmount) {
  const data=loadData();
  data.exp+=Math.max(0,numberValue(expAmount));
  data.energy+=Math.max(0,numberValue(energyAmount));
  data.correctAnswers+=1; data.attempts+=1; data.streak+=1;
  data.bestStreak=Math.max(data.bestStreak,data.streak);
  updateUnitProgress(data,true);
  data.lastPlayed=new Date().toLocaleDateString("sv-SE",{timeZone:"Asia/Tokyo"});
  let leveledUp=false;
  while(data.exp>=data.level*100) { data.exp-=data.level*100; data.level+=1; leveledUp=true; }
  saveData(data);
  return {leveledUp,newLevel:data.level};
}
function recordMistake() {
  const data=loadData();
  data.attempts+=1; data.streak=0; updateUnitProgress(data,false);
  data.lastPlayed=new Date().toLocaleDateString("sv-SE",{timeZone:"Asia/Tokyo"});
  saveData(data);
}
function buildCity() {
  const data=loadData(), next=CITY_BUILDINGS[data.cityLevel], mastery=getTotalMastery(data);
  if(!next||data.level<next.requiredLevel||data.energy<next.cost||mastery<next.requiredMastery) return false;
  data.energy-=next.cost; data.cityLevel+=1; saveData(data); return next.name;
}
function resetData() {
  if(!confirm("算数ワールドの記録だけをリセットしますか？\n図鑑や街も最初からになります。")) return;
  WORLD_KEYS.forEach(key=>localStorage.removeItem(key)); location.reload();
}
function injectWorldStatus() {
  if(document.querySelector(".world-status")||document.body.dataset.home==="true") return;
  const data=loadData(), mastery=getTotalMastery(data), bar=document.createElement("div");
  bar.className="world-status";
  bar.innerHTML=`<span>⭐ Lv.${data.level}</span><span>⚡ ${data.energy}</span><span>🔥 ${data.streak}れんぞく</span><span>📈 ${mastery}%</span><a href="index.html">マップ</a>`;
  Object.assign(bar.style,{display:"flex",gap:"9px",alignItems:"center",justifyContent:"center",flexWrap:"wrap",maxWidth:"560px",margin:"0 auto 12px",padding:"8px 12px",borderRadius:"999px",background:"rgba(255,255,255,.9)",color:"#37474f",fontWeight:"700",fontSize:"14px",boxShadow:"0 2px 8px rgba(0,0,0,.12)"});
  bar.querySelector("a").style.color="inherit"; bar.querySelector("a").style.fontWeight="800";
  document.body.prepend(bar);
}
document.addEventListener("DOMContentLoaded",injectWorldStatus);