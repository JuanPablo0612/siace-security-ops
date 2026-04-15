// Route path constants
export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ALERTS: '/alerts',
  ALERT_DETAIL: '/alerts/:id',
  EVENTS: '/events',
  REPORTS: '/reports',
  CONFIGURATION: '/configuration',
  HEALTH: '/health',
} as const;

// Severity levels
export const SEVERITY = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
} as const;

// Alert status values
export const ALERT_STATUS = {
  OPEN: 'Open',
  INVESTIGATING: 'Investigating',
  RESOLVED: 'Resolved',
} as const;
