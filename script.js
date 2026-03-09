// Initialize Lucide icons
lucide.createIcons();

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
    totalCounter.textContent = `Total: ${ideaCount}`;
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

    // Get current date and time
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
    
    // Check for overflow after adding to DOM
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

ideaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});
