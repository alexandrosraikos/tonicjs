import Modal from './src/components/modal.js'
import API from './src/controllers/communication-controller.js'
import InteractionController from './src/controllers/interaction-controller.js'
import { notify } from './src/functions/base.js'
import Binding from './src/model/binding.js'

class Gin {
    constructor() {
      this.api = this.api();
      this.interface = this.interface();
    }

    static api() {
        return new API()
    }

    static interface() {
        return new InteractionController()
    }
  
    binding(eventType, actionID, method) {
        return new Binding(eventType, actionID, method)
    }

    notify(message, type = 'error', disappearing = true) {
        notify(message, type, disappearing)
    }

    modal(
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