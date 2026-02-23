// js/system.js
// プレイヤーのデータを管理する「データシステム（小人さん）」

// ① 金庫（LocalStorage）から現在のデータを読み込む機能
function loadData() {
    return {
        // 保存されていなければ右側の初期値（1や0）を使います
        level: parseInt(localStorage.getItem('player_level')) || 1,
        exp: parseInt(localStorage.getItem('total_exp')) || 0,
        energy: parseInt(localStorage.getItem('energy')) || 0,
        cityLevel: parseInt(localStorage.getItem('city_level')) || 0
    };
}

// ② 金庫に最新のデータを保存する機能
function saveData(data) {
    localStorage.setItem('player_level', data.level);
    localStorage.setItem('total_exp', data.exp);
    localStorage.setItem('energy', data.energy);
    localStorage.setItem('city_level', data.cityLevel);
}

// ③ 【超重要】問題に正解した時に、経験値とエネルギーを追加する機能
function addRewards(gainedExp, gainedEnergy) {
    let data = loadData(); // まず今のデータを読み込む
    
    data.exp += gainedExp;       // 経験値を足す
    data.energy += gainedEnergy; // エネルギーを足す

    // ④ レベルアップの判定（例：100経験値ごとにレベルアップ）
    // ※設計書に合わせて、ここは後で自由に変更できます
    let nextLevelExp = data.level * 100; 
    if (data.exp >= nextLevelExp) {
        data.level += 1;
        alert("🎉 レベルアップ！ Lv." + data.level + "になったよ！");
        
        // レベルが上がったら、街が発展するかチェックする
        checkCityEvolution(data);
    }

    saveData(data); // 最後に金庫にしまい直す
}

// ⑤ 街の発展システム（設計書 4. 街の発展システムより）
function checkCityEvolution(data) {
    if (data.level >= 2 && data.cityLevel < 1) {
        data.cityLevel = 1;
        alert("✨ 街が発展した！「神殿の土台」ができたよ！");
    } else if (data.level >= 5 && data.cityLevel < 2) {
        data.cityLevel = 2;
        alert("✨ 街が発展した！「家」が建ったよ！");
    }
    // 今後、レベル3（店）、レベル4（住民）、レベル5（城）と簡単に足していけます
}
