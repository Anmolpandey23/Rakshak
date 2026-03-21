import { alerts, gateChecks, hourlyAlerts } from './mockData';

const wait = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

export const alertService = {
  async getAlerts() {
    await wait();
    return JSON.parse(JSON.stringify(alerts));
  },

  async acknowledgeAlert(alertId) {
    await wait(250);
    return { alertId, status: 'ACKNOWLEDGED', success: true };
  },

  async getGateChecks() {
    await wait(350);
    return JSON.parse(JSON.stringify(gateChecks));
  },

  async approveEntry(manholeId) {
    await wait(250);
    return { manholeId, approved: true };
  },

  async getHourlyAlertSeries() {
    await wait(250);
    return hourlyAlerts;
  }
};
