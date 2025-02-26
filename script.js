const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const timer = document.getElementById('timer');
const startBtn = document.getElementById('start_btn');
let isRunning = false;
let countdownInterval;
let totalSeconds = 0;

// 00から23までのoptionを追加
for (let i = 0; i < 24; i++) {
    const option = document.createElement('option');
    option.value = i.toString().padStart(2, '0');
    option.textContent = i.toString().padStart(2, '0');
    hours.appendChild(option);
}

// 00から59までのoptionを追加
for (let i = 0; i < 60; i++) {
    const option = document.createElement('option');
    option.value = i.toString().padStart(2, '0');
    option.textContent = i.toString().padStart(2, '0');
    minutes.appendChild(option);
}

// 時間と分の変更で秒数を設定
function updateTotalSeconds() {
    const selectedHours = parseInt(hours.value, 10);
    const selectedMinutes = parseInt(minutes.value, 10);
    totalSeconds = selectedHours * 3600 + selectedMinutes * 60;
    updateTimerDisplay();
}

// タイマー表示を更新
function updateTimerDisplay() {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    timer.textContent = `${hrs}:${mins}:${secs}`;
}

// カウントダウンを開始
function startCountdown() {
    countdownInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(countdownInterval);
            startBtn.textContent = 'スタート';
            startBtn.style.backgroundColor = 'yellowgreen';
            isRunning = false;
            alert('タイマー満了しました。');
            startBtn.disabled = false;
            updateTotalSeconds();
        }
    }, 1000);
}

// イベントリスナーを追加
hours.addEventListener('change', updateTotalSeconds);
minutes.addEventListener('change', updateTotalSeconds);

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        startCountdown();
        isRunning = true;
        startBtn.disabled = true;
    }
});

// 初期表示を設定
updateTotalSeconds(); 