import { HoursDay } from '../config/seedData';
import { siteConfig } from '../config/site';

export interface HoursStatus {
  statusText: string;
  isOpen: boolean;
  isClosedToday: boolean;
  badgeType: 'open' | 'closed' | 'holiday';
}

export function computeHoursStatus(
  hours: HoursDay[],
  holidayOverrides: { date: string; note: string; closed: boolean }[],
  timezone: string = siteConfig.ianaTimezone
): HoursStatus {
  // Use Intl to get current time in target timezone
  const now = new Date();
  
  // Format current date in target timezone as YYYY-MM-DD
  const formatterDate = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatterDate.formatToParts(now);
  const year = parts.find((p) => p.type === 'year')?.value || '';
  const month = parts.find((p) => p.type === 'month')?.value || '';
  const dayStr = parts.find((p) => p.type === 'day')?.value || '';
  const dateKey = `${year}-${month}-${dayStr}`;

  // Check holiday overrides
  const holiday = holidayOverrides.find((h) => h.date === dateKey);
  if (holiday && holiday.closed) {
    return {
      statusText: `Holiday: ${holiday.note}`,
      isOpen: false,
      isClosedToday: true,
      badgeType: 'holiday',
    };
  }

  // Get current weekday in target timezone
  const formatterWeekday = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long',
  });
  const weekday = formatterWeekday.format(now) as HoursDay['day'];

  // Current time in minutes
  const formatterTime = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  const timeParts = formatterTime.formatToParts(now);
  const currentHour = parseInt(timeParts.find((p) => p.type === 'hour')?.value || '0', 10);
  const currentMinute = parseInt(timeParts.find((p) => p.type === 'minute')?.value || '0', 10);
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  const todaySchedule = hours.find((h) => h.day === weekday);

  if (!todaySchedule || !todaySchedule.isOpen || !todaySchedule.openTime || !todaySchedule.closeTime) {
    // Find next open day
    const daysOrder: HoursDay['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const currentIndex = daysOrder.indexOf(weekday);
    let nextOpen: HoursDay | undefined;
    for (let i = 1; i <= 7; i++) {
      const nextDayName = daysOrder[(currentIndex + i) % 7];
      const found = hours.find((h) => h.day === nextDayName);
      if (found && found.isOpen) {
        nextOpen = found;
        break;
      }
    }
    const nextMsg = nextOpen ? ` · Opens ${nextOpen.day} at ${formatTime12h(nextOpen.openTime)}` : '';
    return {
      statusText: `Closed today${nextMsg}`,
      isOpen: false,
      isClosedToday: true,
      badgeType: 'closed',
    };
  }

  // Parse open and close times
  const [openH, openM] = todaySchedule.openTime.split(':').map((n) => parseInt(n, 10));
  const [closeH, closeM] = todaySchedule.closeTime.split(':').map((n) => parseInt(n, 10));
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (currentTotalMinutes < openMinutes) {
    return {
      statusText: `Opens at ${formatTime12h(todaySchedule.openTime)}`,
      isOpen: false,
      isClosedToday: false,
      badgeType: 'closed',
    };
  } else if (currentTotalMinutes >= openMinutes && currentTotalMinutes < closeMinutes) {
    return {
      statusText: `Open now · Closes at ${formatTime12h(todaySchedule.closeTime)}`,
      isOpen: true,
      isClosedToday: false,
      badgeType: 'open',
    };
  } else {
    // Closed for today after hours
    return {
      statusText: `Closed for today · Opens tomorrow`,
      isOpen: false,
      isClosedToday: false,
      badgeType: 'closed',
    };
  }
}

function formatTime12h(timeStr: string): string {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map((n) => parseInt(n, 10));
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  const minuteStr = m > 0 ? `:${m.toString().padStart(2, '0')}` : ':00';
  return `${hour12}${minuteStr} ${ampm}`;
}
