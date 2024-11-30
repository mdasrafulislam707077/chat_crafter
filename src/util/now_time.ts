export default function getFormattedDateTime() {
    const now = new Date(Date.now());
  
    // Format the date
    const date = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getFullYear()).slice(-2)}`;
  
    // Format the time
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const time = `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'pm' : 'am'}`;
  
    // Get the day of the week
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = dayNames[now.getDay()];
  
    return { date, time, day };
  }