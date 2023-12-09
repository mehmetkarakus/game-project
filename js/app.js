let playerHeal = 100;
let monsterHeal = 100;
const logs = [];
let gameIsOn = false;

const playerHealthBar = document.getElementById('playerHealthBar');
const monsterHealthBar = document.getElementById('monsterHealthBar');
const gameControls = document.getElementById('gameControls');
const logSection = document.getElementById('logSection');
const logList = document.getElementById('logList'); 

function startGame() {
    gameIsOn = true;
    gameControls.style.display = 'block';

    const gameSection = document.getElementById('gameSection');
    gameSection.style.display = 'none';
}

function attack() {
    const point = Math.ceil(Math.random() * 10);
    monsterHeal -= point;
    addLog({ turn: "p", text: `OYUNCU ATAĞI: ${point}` });
    monsterAttack();
}

function specialAttack() {
    const point = Math.ceil(Math.random() * 25);
    monsterHeal -= point;
    addLog({ turn: "p", text: `ÖZEL OYUNCU ATAĞI: ${point}` });
    monsterAttack();
}

function healUp() {
    const point = Math.ceil(Math.random() * 20);
    if (playerHeal < 100) {
        if (playerHeal + point > 100) {
            playerHeal = 100;
        } else {
            playerHeal += point;
        }
        addLog({ turn: "p", text: `İLK YARDIM: ${point}` });
        monsterAttack();
    } else {
        addLog({ turn: "p", text: "Canın zaten maksimum seviyede!" });
    }
}


function giveUp() {
    playerHeal = 0;
    addLog({ turn: "p", text: "OYUNCU PES ETTİ!!!" });
}

function monsterAttack() {
    const point = Math.ceil(Math.random() * 15);
    playerHeal -= point;
    addLog({ turn: "m", text: `CANAVAR ATAĞI: ${point}` });
    checkGame();
}

function addLog(log) {
    logs.push(log);
    renderLogs();
}

function checkGame() {
    if (playerHeal <= 0) {
        playerHeal = 0;
        if (confirm("Oyunu KAYBETTİN. Tekrar denemek ister misin?")) {
            resetGame();
        }
    } else if (monsterHeal <= 0) {
        monsterHeal = 0;
        if (confirm("Oyunu KAZANDIN. Tekrar denemek ister misin?")) {
            resetGame();
        }
    }
}

function resetGame() {
    playerHeal = 100;
    monsterHeal = 100;
    logs.length = 0;
    gameIsOn = false;
    gameControls.style.display = 'none';
    logSection.style.display = 'none';
    gameSection.style.display = 'block';
}

function renderLogs() {
    logList.innerHTML = '';
    logs.forEach(log => {
        const logItem = document.createElement('li');
        logItem.textContent = log.text;

        logItem.classList.add('py-2', 'px-4', 'mb-2', 'rounded', 'text-white');

        if (log.turn === 'p') {
            logItem.classList.add('bg-blue-500');
        } else {
            logItem.classList.add('bg-red-500');
        }

        logList.appendChild(logItem);
    });
    logSection.style.display = 'block';
}

function updateHealthBars() {
    playerHealthBar.textContent = `${playerHeal}%`;
    playerHealthBar.style.width = `${playerHeal}%`;
    monsterHealthBar.textContent = `${monsterHeal}%`;
    monsterHealthBar.style.width = `${monsterHeal}%`;
}

setInterval(() => {
    if (gameIsOn) {
        checkGame();
        updateHealthBars();
    }
}, 1000);
