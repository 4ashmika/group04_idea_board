// Initialize Lucide icons
lucide.createIcons();

// Elements
const ideaBoardContent = document.getElementById('idea-board-content');
const gpaCalcSection = document.getElementById('gpa-calc-section');
const studyTimerSection = document.getElementById('study-timer-section');

const navIdeaBoard = document.getElementById('nav-idea-board');
const navGpaCalc = document.getElementById('nav-gpa-calc');
const navStudyTimer = document.getElementById('nav-study-timer');

// --- Dark Mode Logic ---
const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
const toggleIconContainer = document.querySelector('.toggle-label');

darkModeCheckbox.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleIconContainer.innerHTML = '<i data-lucide="sun"></i>';
    } else {
        toggleIconContainer.innerHTML = '<i data-lucide="moon"></i>';
    }
    lucide.createIcons();
});

// --- Navigation Logic ---
function showSection(sectionId) {
    ideaBoardContent.style.display = 'none';
    gpaCalcSection.style.display = 'none';
    studyTimerSection.style.display = 'none';
    
    navIdeaBoard.classList.remove('active');
    navGpaCalc.classList.remove('active');
    navStudyTimer.classList.remove('active');

    if (sectionId === 'idea-board') {
        ideaBoardContent.style.display = 'flex';
        navIdeaBoard.classList.add('active');
    } else if (sectionId === 'gpa-calc') {
        gpaCalcSection.style.display = 'block';
        navGpaCalc.classList.add('active');
    } else if (sectionId === 'study-timer') {
        studyTimerSection.style.display = 'block';
        navStudyTimer.classList.add('active');
    }
}

navIdeaBoard.addEventListener('click', () => showSection('idea-board'));
navGpaCalc.addEventListener('click', () => showSection('gpa-calc'));
navStudyTimer.addEventListener('click', () => showSection('study-timer'));

// --- Idea Board Logic ---
const addBtn = document.getElementById('add-idea-btn');
const resetBtn = document.getElementById('reset-btn');
const userSelect = document.getElementById('user-select');
const ideaInput = document.getElementById('idea-input');
const ideaList = document.getElementById('idea-list');
const totalCounter = document.getElementById('total-counter');
const emptyState = document.getElementById('empty-state');

let ideaCount = 0;

function updateCounter() {
    ideaCount++;
    totalCounter.textContent = `Total Ideas: ${ideaCount}`;
}

addBtn.addEventListener('click', () => {
    const userName = userSelect.value;
    const ideaText = ideaInput.value.trim();

    if (!userName || !ideaText) {
        alert("Please select your name and share an idea!");
        return;
    }

    if (emptyState && ideaCount === 0) {
        emptyState.style.display = 'none';
    }

    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fullDateTime = `${dateStr} at ${timeStr}`;

    const listItem = document.createElement('li');
    listItem.className = 'idea-item';
    listItem.innerHTML = `
        <div class="idea-content">
            <span class="idea-text clamped">${ideaText}</span>
            <button class="toggle-btn">See More</button>
            <div class="idea-meta">
                <span class="suggested-by">suggested by <strong>${userName}</strong></span>
                <span class="timestamp"><i data-lucide="clock"></i> ${fullDateTime}</span>
            </div>
        </div>
        <div class="status-icon">
            <i data-lucide="check-circle" style="color: #10b981;"></i>
        </div>
    `;

    ideaList.prepend(listItem);
    lucide.createIcons();
    
    const textElement = listItem.querySelector('.idea-text');
    const toggleBtn = listItem.querySelector('.toggle-btn');
    
    setTimeout(() => {
        if (textElement.scrollHeight > textElement.clientHeight) {
            toggleBtn.style.display = 'block';
        }
    }, 0);

    updateCounter();
    ideaInput.value = "";
});

ideaList.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const btn = e.target;
        const textElement = btn.previousElementSibling;
        const isClamped = textElement.classList.contains('clamped');

        if (isClamped) {
            textElement.classList.remove('clamped');
            btn.textContent = 'See Less';
        } else {
            textElement.classList.add('clamped');
            btn.textContent = 'See More';
        }
    }
});

resetBtn.addEventListener('click', () => {
    userSelect.selectedIndex = 0;
    ideaInput.value = "";
});

// --- GPA Calculator Logic ---
const calculateGpaBtn = document.getElementById('calculate-gpa-btn');
const addGpaRowBtn = document.getElementById('add-gpa-row-btn');
const additionalGpaRows = document.getElementById('additional-gpa-rows');
const gpaResult = document.getElementById('gpa-result');

const gradePoints = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'E': 0.0, 'F': 0.0
};

const DEFAULT_CREDITS = 3.0;

addGpaRowBtn.addEventListener('click', () => {
    const row = document.createElement('div');
    row.className = 'gpa-row';
    row.style.marginTop = '10px';
    row.innerHTML = `
        <input type="text" placeholder="Subject" class="subject-input">
        <input type="text" placeholder="Grade" class="grade-input">
    `;
    additionalGpaRows.appendChild(row);
});

calculateGpaBtn.addEventListener('click', () => {
    const gradeInputs = document.querySelectorAll('.grade-input');
    
    let totalQualityPoints = 0;
    let subjectCount = 0;
    
    for (let i = 0; i < gradeInputs.length; i++) {
        const gradeStr = gradeInputs[i].value.trim().toUpperCase();
        
        if (gradeStr) {
            const points = gradePoints[gradeStr];
            if (points !== undefined) {
                totalQualityPoints += points * DEFAULT_CREDITS;
                subjectCount++;
            }
        }
    }
    
    if (subjectCount > 0) {
        const totalCredits = subjectCount * DEFAULT_CREDITS;
        const gpa = (totalQualityPoints / totalCredits).toFixed(2);
        gpaResult.textContent = `GPA: ${gpa}`;
        gpaResult.style.display = 'block';
    } else {
        gpaResult.textContent = "Please enter valid grades (A, B, C...)";
        gpaResult.style.display = 'block';
    }
});

// --- Study Timer Logic ---
const timerDisplay = document.getElementById('timer-display');
const startTimerBtn = document.getElementById('start-timer-btn');
const resetTimerBtn = document.getElementById('reset-timer-btn');

let timeLeft = 25 * 60;
let timerId = null;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startTimerBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        startTimerBtn.textContent = 'Start';
    } else {
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerId);
                timerId = null;
                alert("Time is up! Take a break.");
                startTimerBtn.textContent = 'Start';
            }
        }, 1000);
        startTimerBtn.textContent = 'Pause';
    }
});

resetTimerBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60;
    updateTimerDisplay();
    startTimerBtn.textContent = 'Start';
});
