// ==========================================
// 算数ワールド - 共通システム
// 既存の保存キーを維持したまま、進捗・報酬・街を管理します。
// ==========================================

const CITY_BUILDINGS = [
  { name: "石のモニュメント", cost: 10, requiredLevel: 1 },
  { name: "キャンプ場", cost: 20, requiredLevel: 2 },
  { name: "きれいな泉", cost: 35, requiredLevel: 3 },
  { name: "丸太の小屋", cost: 50, requiredLevel: 4 },
  { name: "村の広場", cost: 80, requiredLevel: 5 },
  { name: "レンガの家", cost: 120, requiredLevel: 7 },
  { name: "にぎやかな市場", cost: 200, requiredLevel: 10 },
  { name: "大きな時計塔", cost: 350, requiredLevel: 15 },
  { name: "お城の門", cost: 500, requiredLevel: 20 },
  { name: "算数キングダム城", cost: 1000, requiredLevel: 30 }
];

const WORLD_KEYS = ["exp", "level", "energy", "cityLevel", "companions",
  "correctAnswers", "attempts", "streak", "bestStreak", "lastPlayed"];

function numberValue(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback;
}

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch (_) {
    return fallback;
  }
}

function loadData() {
  const companions = readJson("companions", []);
  return {
    // 既存キーをそのまま読み込む。旧データのない項目だけ初期値にする。
    exp: numberValue(localStorage.getItem("exp")),
    level: Math.max(1, numberValue(localStorage.getItem("level"), 1)),
    energy: numberValue(localStorage.getItem("energy")),
    cityLevel: Math.min(CITY_BUILDINGS.length, numberValue(localStorage.getItem("cityLevel"))),
    companions: Array.isArray(companions) ? companions : [],
    correctAnswers: numberValue(localStorage.getItem("correctAnswers")),
    attempts: numberValue(localStorage.getItem("attempts")),
    streak: numberValue(localStorage.getItem("streak")),
    bestStreak: numberValue(localStorage.getItem("bestStreak")),
    lastPlayed: localStorage.getItem("lastPlayed") || ""
  };
}

function saveData(data) {
  const safe = {
    ...data,
    exp: numberValue(data.exp),
    level: Math.max(1, numberValue(data.level, 1)),
    energy: numberValue(data.energy),
    cityLevel: Math.min(CITY_BUILDINGS.length, numberValue(data.cityLevel)),
    companions: Array.isArray(data.companions) ? data.companions : [],
    correctAnswers: numberValue(data.correctAnswers),
    attempts: numberValue(data.attempts),
    streak: numberValue(data.streak),
    bestStreak: numberValue(data.bestStreak),
    lastPlayed: data.lastPlayed || ""
  };
  try {
    localStorage.setItem("exp", String(safe.exp));
    localStorage.setItem("level", String(safe.level));
    localStorage.setItem("energy", String(safe.energy));
    localStorage.setItem("cityLevel", String(safe.cityLevel));
    localStorage.setItem("companions", JSON.stringify(safe.companions));
    localStorage.setItem("correctAnswers", String(safe.correctAnswers));
    localStorage.setItem("attempts", String(safe.attempts));
    localStorage.setItem("streak", String(safe.streak));
    localStorage.setItem("bestStreak", String(safe.bestStreak));
    localStorage.setItem("lastPlayed", safe.lastPlayed);
  } catch (_) {
    // 保存できない環境でも、学習画面を止めない。
  }
}

function addRewards(expAmount, energyAmount) {
  const data = loadData();
  data.exp += Math.max(0, numberValue(expAmount));
  data.energy += Math.max(0, numberValue(energyAmount));
  data.correctAnswers += 1;
  data.attempts += 1;
  data.streak += 1;
  data.bestStreak = Math.max(data.bestStreak, data.streak);
  data.lastPlayed = new Date().toISOString().slice(0, 10);

  let leveledUp = false;
  // 大きな報酬でもレベルを取りこぼさない。
  while (data.exp >= data.level * 100) {
    data.exp -= data.level * 100;
    data.level += 1;
    leveledUp = true;
  }
  saveData(data);
  return { leveledUp, newLevel: data.level };
}

function recordMistake() {
  const data = loadData();
  data.attempts += 1;
  data.streak = 0;
  data.lastPlayed = new Date().toISOString().slice(0, 10);
  saveData(data);
}

function buildCity() {
  const data = loadData();
  const nextBuilding = CITY_BUILDINGS[data.cityLevel];
  if (!nextBuilding || data.level < nextBuilding.requiredLevel || data.energy < nextBuilding.cost) return false;
  data.energy -= nextBuilding.cost;
  data.cityLevel += 1;
  saveData(data);
  return nextBuilding.name;
}

function resetData() {
  if (!confirm("算数ワールドの記録だけをリセットしますか？\n図鑑や街も最初からになります。")) return;
  WORLD_KEYS.forEach(key => localStorage.removeItem(key));
  location.reload();
}

function injectWorldStatus() {
  if (document.querySelector(".world-status") || document.body.dataset.home === "true") return;
  const data = loadData();
  const bar = document.createElement("div");
  bar.className = "world-status";
  bar.innerHTML = `<span>⭐ Lv.${data.level}</span><span>⚡ ${data.energy}</span><span>🔥 ${data.streak}れんぞく</span><a href="index.html">マップ</a>`;
  Object.assign(bar.style, {
    display:"flex", gap:"10px", alignItems:"center", justifyContent:"center",
    flexWrap:"wrap", maxWidth:"520px", margin:"0 auto 12px", padding:"8px 12px",
    borderRadius:"999px", background:"rgba(255,255,255,.88)", color:"#37474f",
    fontWeight:"700", fontSize:"14px", boxShadow:"0 2px 8px rgba(0,0,0,.12)"
  });
  bar.querySelector("a").style.color = "inherit";
  bar.querySelector("a").style.fontWeight = "800";
  document.body.prepend(bar);
}

document.addEventListener("DOMContentLoaded", injectWorldStatus);
