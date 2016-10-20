import ENV from 'pix-live/config/environment';

export function configurePixApiHost(locationObject) {

  if (ENV.environment === 'production') {
    return 'https://api-prod.pix-app.ovh';
  }

  if (ENV.environment === 'staging') {
    return 'https://api-development.pix-app.ovh';
  }

  if (/localhost/.test(locationObject.hostname)) {
    return 'http://localhost:3000';
  }

  const matches = /^(.*).pix.beta.gouv.fr/.exec(locationObject.hostname);
  return `http://${matches[1]}.pix-app.ovh`;
}

export function initialize() {

  EmberENV.pixApiHost = configurePixApiHost(window.location);
}

export default {
  name: 'configure-pix-api-host',
  initialize
};