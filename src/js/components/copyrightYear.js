export function initCopyrightYear() {
  const el = document.getElementById("copyright-year");
  if (!el) return;

  el.textContent = new Date().getFullYear();
}