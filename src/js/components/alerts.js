import { fetchJson } from "../functions/loadData";

export function renderAlerts() {
  console.log("Rendering alerts");
  //need to load the alerts from site
  const siteAlertsPath = "/data/alerts.json";

  fetchJson(siteAlertsPath).then((data) => {
    if (!data || !data.alerts || data.alerts.length === 0) {
      console.log("No alerts to render");
      return;
    }
    const alertsContainer = document.getElementById("alerts-container");
    if (!alertsContainer) {
      console.error("Alerts container not found");
      return;
    }
    data.alerts.forEach((alert) => {
      let now = new Date();
      let dateFrom = alert.date_from ? new Date(alert.date_from) : null;
      let dateTo = alert.date_to ? new Date(alert.date_to) : null;
 
      //check date range
      if ((dateFrom && now < dateFrom) || (dateTo && now > dateTo)) {
        console.log(`Skipping alert "${alert.title}" due to date range`);
        return; //skip this alert
      } else{
        const alertDiv = document.createElement("div");
        alertDiv.className = `alert alert-${alert.type} show`;
        alertDiv.setAttribute("role", "alert");
        alertDiv.innerHTML = `
          <strong>${alert.title}</strong> ${alert.message}          
        `;
        alertsContainer.appendChild(alertDiv);
      }
    });
  });
}
