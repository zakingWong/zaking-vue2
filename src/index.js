import { initMixin } from "./init";
import { initLifeCycle } from "./lifecycle";
// 在没有new Vue之前，代码都是顺序，并且在一个tick中执行的。
// 所以，注意这里，我们声明了一个Vue，但是，此时并没有执行new Vue。注意，我说的此时，就是js引擎执行到这里的时候。
function Vue(options) {
  // 这个this，指的的vm，也就是Vue的实例
  this._init(options);
}
// 所以，在这里，我们引入了initMixin，并且执行了initMixin。那么我们去initMixin中看下它干了啥
initMixin(Vue);
initLifeCycle(Vue);
export default Vue;
