import Modal from './src/components/modal.js'
import API from './src/controllers/communication-controller.js'
import InteractionController from './src/controllers/interaction-controller.js'
import { notify } from './src/functions/base.js'
import Binding from './src/model/binding.js'

class Gin {
    constructor(classSelector) {
      this.selector = classSelector;
      this.api = Gin.api();
      this.interface = Gin.interface(this.selector);
    }

    static api() {
        return new API()
    }

    static interface(classSelector) {
        return new InteractionController(classSelector)
    }
  
    static binding(eventType, actionID, method) {
        return new Binding(eventType, actionID, method)
    }

    static notify(message, type = 'error', disappearing = true) {
        notify(message, type, disappearing)
    }

    static modal(
        identifier,
        data,
        index = 0,
        completion = null,
        fullCanvas = false
    ) {
        return new Modal(identifier, data, index, completion, fullCanvas)
    }
}

export default Gin;