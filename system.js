// ==========================================
// 算数ワールド - システム設定 (system.js)
// ==========================================

// 1. 街の建物のデータ（名前、必要なエネルギー、必要なレベル）
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

// 2. データを読み込む関数
function loadData() {
    return {
        exp: parseInt(localStorage.getItem("exp")) || 0,
        level: parseInt(localStorage.getItem("level")) || 1,
        energy: parseInt(localStorage.getItem("energy")) || 0,
        cityLevel: parseInt(localStorage.getItem("cityLevel")) || 0, // 街のレベルを読み込む
        companions: JSON.parse(localStorage.getItem("companions")) || [] // 仲間のデータを読み込む
    };
}

// 3. データを保存する関数
function saveData(data) {
    localStorage.setItem("exp", data.exp);
    localStorage.setItem("level", data.level);
    localStorage.setItem("energy", data.energy);
    localStorage.setItem("cityLevel", data.cityLevel); // 街のレベルを保存する
    localStorage.setItem("companions", JSON.stringify(data.companions)); // 仲間のデータを保存する
}

// 4. 正解したときにポイントを足す関数
function addRewards(expAmount, energyAmount) {
    let data = loadData();
    data.exp += expAmount;
    data.energy += energyAmount;
    
    let leveledUp = false;
    let requiredExp = data.level * 100; // 次のレベルに必要な経験値
    
    if (data.exp >= requiredExp) {
        data.exp -= requiredExp;
        data.level += 1;
        leveledUp = true;
    }
    
    saveData(data);
    return { leveledUp: leveledUp, newLevel: data.level };
}

// 5. 街を建設する関数
function buildCity() {
    let data = loadData();
    let nextBuilding = CITY_BUILDINGS[data.cityLevel];

    // 次の建物データがあり、レベルとエネルギーが足りているかチェック
    if (nextBuilding && data.level >= nextBuilding.requiredLevel && data.energy >= nextBuilding.cost) {
        data.energy -= nextBuilding.cost; // エネルギーを消費
        data.cityLevel += 1;             // 街レベルをアップ
        saveData(data);
        alert(nextBuilding.name + " を建設しました！✨");
        return true; // 成功
    }
    return false; // 失敗
}

// 6. デバッグ用：データをリセットする関数
function resetData() {
    if(confirm("データをすべてリセットして最初からやり直しますか？")) {
        localStorage.clear();
        location.reload();
    }
}
