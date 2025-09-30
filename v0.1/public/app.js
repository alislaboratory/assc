// ASSC 2026 Live Timetabling - Client-side JavaScript

// Initialize Socket.IO connection
const socket = io();

// Connection status management
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');

// Update connection status
function updateConnectionStatus(connected) {
    if (statusIndicator && statusText) {
        if (connected) {
            statusIndicator.className = 'status-indicator status-online';
            statusText.textContent = 'Connected - Live updates active';
        } else {
            statusIndicator.className = 'status-indicator status-offline';
            statusText.textContent = 'Disconnected - Check your connection';
        }
    }
    
    // Update scroll status sidebar
    const scrollStatusIndicator = document.getElementById('scrollStatusIndicator');
    const scrollStatusText = document.getElementById('scrollStatusText');
    
    if (scrollStatusIndicator && scrollStatusText) {
        if (connected) {
            scrollStatusIndicator.className = 'status-indicator status-online';
            scrollStatusText.textContent = 'Connected';
        } else {
            scrollStatusIndicator.className = 'status-indicator status-offline';
            scrollStatusText.textContent = 'Disconnected';
        }
    }
}

// Socket.IO event handlers
socket.on('connect', function() {
    console.log('✅ Connected to server');
    updateConnectionStatus(true);
});

socket.on('disconnect', function() {
    console.log('❌ Disconnected from server');
    updateConnectionStatus(false);
});

socket.on('connect_error', function(error) {
    console.error('Connection error:', error);
    updateConnectionStatus(false);
});

socket.on('reconnect', function() {
    console.log('🔄 Reconnected to server');
    updateConnectionStatus(true);
});

// Utility functions
function formatTime(timeString) {
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function isEventUpcoming(eventTime) {
    const currentTime = getCurrentTime();
    return eventTime > currentTime;
}

function isEventCurrent(eventTime, duration = 60) {
    const currentTime = getCurrentTime();
    const eventEnd = addMinutes(eventTime, duration);
    return currentTime >= eventTime && currentTime <= eventEnd;
}

function addMinutes(timeString, minutes) {
    const [hours, mins] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
}

// Error handling
function handleApiError(error, context = 'API request') {
    console.error(`${context} failed:`, error);
    
    // Show user-friendly error message
    if (typeof showAlert === 'function') {
        showAlert(`Error: ${error.message || 'Something went wrong'}`, 'error');
    }
}

// Auto-refresh functionality (optional)
let autoRefreshInterval;

function startAutoRefresh(intervalMinutes = 5) {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }
    
    autoRefreshInterval = setInterval(() => {
        if (typeof loadSchedule === 'function') {
            loadSchedule();
        } else if (typeof loadEvents === 'function') {
            loadEvents();
        }
    }, intervalMinutes * 60 * 1000);
}

function stopAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    }
}

// Initialize auto-refresh when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start auto-refresh as backup (in case WebSocket fails)
    startAutoRefresh(10);
    
    // Stop auto-refresh when page is hidden (battery saving)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoRefresh();
        } else {
            startAutoRefresh(10);
        }
    });
});

// Export functions for use in other scripts
window.socketUtils = {
    formatTime,
    getCurrentTime,
    isEventUpcoming,
    isEventCurrent,
    handleApiError,
    startAutoRefresh,
    stopAutoRefresh
};
