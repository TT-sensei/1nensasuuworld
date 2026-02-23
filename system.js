// js/system.js
// 算数ワールド コアデータシステム（完全版）

// 街の発展リスト（全15段階）
const CITY_BUILDINGS = [
    { name: "神殿の土台",       requiredLevel: 2,  cost: 30,   desc: "すべての始まり。数の力が少し戻る。" },
    { name: "ちいさなテント",   requiredLevel: 3,  cost: 50,   desc: "探検家（プレイヤー）の休憩所。" },
    { name: "はじまりの井戸",   requiredLevel: 4,  cost: 80,   desc: "きれいな水が湧き、緑が芽吹く。" },
    { name: "木の家",           requiredLevel: 5,  cost: 120,  desc: "初めての住人がやってくるかも？" },
    { name: "すうじの畑",       requiredLevel: 7,  cost: 180,  desc: "数字の形をした野菜が育つ畑。" },
    { name: "どうぐ屋",         requiredLevel: 9,  cost: 250,  desc: "冒険のアイテムが並ぶお店。" },
    { name: "レンガの家",       requiredLevel: 11, cost: 350,  desc: "丈夫な家。住人がさらに増える。" },
    { name: "なかまの広場",     requiredLevel: 13, cost: 450,  desc: "集めた仲間たちが遊びに来る場所。" },
    { name: "ふしぎな時計塔",   requiredLevel: 16, cost: 600,  desc: "街に時間が戻り、活気があふれる。" },
    { name: "パン屋さん",       requiredLevel: 19, cost: 800,  desc: "美味しい匂いで住人大喜び！" },
    { name: "魔法の図書館",     requiredLevel: 22, cost: 1100, desc: "算数のひみつがたくさん書かれた本がある。" },
    { name: "キラキラの噴水",   requiredLevel: 26, cost: 1500, desc: "数エネルギーがあふれ出す美しい噴水。" },
    { name: "星見の天文台",     requiredLevel: 30, cost: 2000, desc: "宇宙の数の神秘を調べる場所。" },
    { name: "かずの女神の像",   requiredLevel: 35, cost: 2600, desc: "世界を平和に導く女神のシンボル。" },
    { name: "算数ワールドの城", requiredLevel: 40, cost: 3500, desc: "世界が完全に再生された証の大きなお城！" }
];

// ① データの読み込み
function loadData() {
    return {
        level: parseInt(localStorage.getItem('player_level')) || 1,
        exp: parseInt(localStorage.getItem('total_exp')) || 0,
        energy: parseInt(localStorage.getItem('energy')) || 0,
        cityLevel: parseInt(localStorage.getItem('city_level')) || 0
    };
}

// ② データの保存
function saveData(data) {
    localStorage.setItem('player_level', data.level);
    localStorage.setItem('total_exp', data.exp);
    localStorage.setItem('energy', data.energy);
    localStorage.setItem('city_level', data.cityLevel);
}

// ③ 報酬の追加とレベルアップ判定（ボス戦の大量獲得にも対応）
function addRewards(gainedExp, gainedEnergy) {
    let data = loadData();
    data.exp += gainedExp;
    data.energy += gainedEnergy;

    let oldLevel = data.level;

    // 経験値が足りている限り何度でもレベルアップ
    while (data.exp >= data.level * 100) {
        data.level++;
    }

    let leveledUp = data.level > oldLevel;

    if (leveledUp) {
        alert("🎉 レベルアップ！ Lv." + data.level + "になったよ！");
    }

    saveData(data);
    return { leveledUp, newLevel: data.level, gainedExp, gainedEnergy };
}

// ④ 街の建設システム（手動で建てる）
function buildCity() {
    let data = loadData();
    let nextIndex = data.cityLevel; // 次に建てる建物のインデックス
    let building = CITY_BUILDINGS[nextIndex];

    if (!building) {
        alert("👑 すべての建物を建設済みです！世界は完全に再生されました！");
        return false;
    }

    if (data.level < building.requiredLevel) {
        alert("❌ レベルが足りません！\n必要レベル: " + building.requiredLevel + "（現在 Lv." + data.level + "）");
        return false;
    }

    if (data.energy < building.cost) {
        alert("❌ エネルギーが足りません！\n必要エネルギー: " + building.cost + "（現在 " + data.energy + "）");
        return false;
    }

    // 建設成功！
    data.energy -= building.cost;
    data.cityLevel++;
    saveData(data);

    alert("✨「" + building.name + "」を建てた！\n" + building.desc);
    return true; // 成功したことをUIに伝える
}

// ⑤ 開発用リセット
function resetData() {
    if(confirm("本当にデータをリセットしますか？（最初からになります）")) {
        localStorage.clear();
        alert("データをリセットしました。");
        location.reload();
    }
}
