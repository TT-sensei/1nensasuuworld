// データを読み込む関数
function loadData() {
    return {
        exp: parseInt(localStorage.getItem("exp")) || 0,
        level: parseInt(localStorage.getItem("level")) || 1,
        energy: parseInt(localStorage.getItem("energy")) || 0,
        // 👇 ここが新しく追加した「仲間のデータ」を読み込む部分です！
        companions: JSON.parse(localStorage.getItem("companions")) || []
    };
}

// データを保存する関数
function saveData(data) {
    localStorage.setItem("exp", data.exp);
    localStorage.setItem("level", data.level);
    localStorage.setItem("energy", data.energy);
    // 👇 ここが新しく追加した「仲間のデータ」を保存する部分です！
    localStorage.setItem("companions", JSON.stringify(data.companions));
}

// 正解したときにポイントを足す関数
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
