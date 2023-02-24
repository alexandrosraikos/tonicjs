import Modal from './src/components/modal'
import API from './src/controllers/communication-controller'
import InteractionController from './src/controllers/interaction-controller'
import { notify } from './src/functions/base'
import Binding from './src/model/binding'

class Gin {
    constructor() {
      this.api = this.api();
      this.interface = this.interface();
    }
  
    binding(eventType, actionID, method) {
        return new Binding(eventType, actionID, method)
    }

    api() {
        return new API()
    }

    interface() {
        return new InteractionController()
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

module.exports = Gin;