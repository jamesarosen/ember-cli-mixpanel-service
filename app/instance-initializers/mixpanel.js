import Config from '../config/environment';

export function initialize(appInstance) {
  if (Config.mixpanel.trackTransitions == null) {
    Config.mixpanel.trackTransitions = true;
  }

  if (Config.mixpanel.enabled && Config.mixpanel.trackTransitions) {
    if (typeof(appInstance.lookup) === 'undefined') {
      appInstance = appInstance.container;
    }
    let router = appInstance.lookup('router:main');
    router.on('didTransition', function() {
      appInstance.lookup('service:mixpanel').trackPageView(this.get('url'));
    });
  }
}

export default {
  name: 'mixpanel',
  initialize: initialize
};
