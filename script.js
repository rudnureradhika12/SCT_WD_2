// Variables to keep track of time
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let interval;
let running = false;

// Select DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

// Start or pause the stopwatch
startPauseBtn.addEventListener('click', () => {
    if (!running) {
        startPauseBtn.textContent = 'Pause';
        running = true;
        interval = setInterval(updateTime, 10); // Update every 10ms for milliseconds
    } else {
        startPauseBtn.textContent = 'Start';
        running = false;
        clearInterval(interval);
    }
});

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    running = false;
    milliseconds = seconds = minutes = 0;
    startPauseBtn.textContent = 'Start';
    updateDisplay();
    lapList.innerHTML = ''; // Clear lap times
});

// Record a lap time
lapBtn.addEventListener('click', () => {
    if (running) {
        const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
});

// Update time
function updateTime() {
    milliseconds += 1;
    if (milliseconds >= 100) {
        milliseconds = 0;
        seconds += 1;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }
    updateDisplay();
}

// Update the display with formatted time
function updateDisplay() {
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

// Format time with leading zeros
function formatTime(unit) {
    return unit < 10 ? `0${unit}` : unit;
}
