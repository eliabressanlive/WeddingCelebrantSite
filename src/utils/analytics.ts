import ReactGA from 'react-ga4';

// ============================================================
// 🔧 REPLACE THIS WITH YOUR GA4 MEASUREMENT ID
// Get it from: Google Analytics → Admin → Data Streams → Web
// ============================================================
const GA_MEASUREMENT_ID = 'G-5GSEKC1FH3';

let isInitialized = false;

/**
 * Initialize Google Analytics 4.
 * Only runs once, and only if the user has accepted cookies.
 */
export const initGA = (): void => {
  if (isInitialized) return;

  const consent = localStorage.getItem('cookieConsent');
  if (consent !== 'accepted') return;

  ReactGA.initialize(GA_MEASUREMENT_ID);
  isInitialized = true;

  // Send initial pageview
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname + window.location.hash,
    title: document.title,
  });
};

/**
 * Track when a section becomes visible in the viewport.
 * Uses the GA4 event "section_view".
 */
export const trackSectionView = (sectionName: string): void => {
  if (!isInitialized) return;

  ReactGA.event({
    category: 'Section',
    action: 'view',
    label: sectionName,
  });
};

/**
 * Track a click on an interactive element.
 */
export const trackClick = (category: string, label: string): void => {
  if (!isInitialized) return;

  ReactGA.event({
    category,
    action: 'click',
    label,
  });
};

/**
 * Track form submissions (e.g., contact form).
 */
export const trackFormSubmit = (formName: string, success: boolean): void => {
  if (!isInitialized) return;

  ReactGA.event({
    category: 'Form',
    action: success ? 'submit_success' : 'submit_error',
    label: formName,
  });
};

/**
 * Track language changes.
 */
export const trackLanguageChange = (language: string): void => {
  if (!isInitialized) return;

  ReactGA.event({
    category: 'Language',
    action: 'change',
    label: language,
  });
};

/**
 * Track outbound link clicks.
 */
export const trackOutboundLink = (url: string): void => {
  if (!isInitialized) return;

  ReactGA.event({
    category: 'Outbound',
    action: 'click',
    label: url,
  });
};

/**
 * Disable GA tracking (e.g., when user revokes consent).
 */
export const disableGA = (): void => {
  // Set the GA opt-out window property
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  isInitialized = false;
};
