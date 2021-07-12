import { Jigsaw } from './jisgaw';

function init(element, success, fail) {
  new Jigsaw(element, success, fail).init();
}

export default { init };
