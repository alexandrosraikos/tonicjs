import Modal from './src/components/modal.js'
import API from './src/controllers/communication-controller.js'
import InteractionController from './src/controllers/interaction-controller.js'
import { notify } from './src/functions/base.js'

/**
 * The main class for the TonicJS library.
 * 
 * @since 1.0.0
 * @class Tonic
 * @property {String} identifier The identifier for the class.
 * @property {API} api The API controller.
 * @property {InteractionController} interface The interface controller.
 * @property {Object} translations The translations.
 */
class Tonic {

    /**
     * The identifier for the class.
     */
    #identifier = null;

    /**
     * The API controller.
     */
    #api = null;

    /**
     * The interface controller.
     */
    #interface = null;

    /**
     * The class constructor.
     * 
     * @since 1.0.0
     * @memberof Tonic
     * @returns {void}
     */
    constructor() {
      this.#identifier = TonicJSProperties.identifier;
      this.#api = new API();
      this.#interface = new InteractionController(this.#identifier);
    }

    /**
     * Register the interface actions.
     * 
     * @param {Object} actions The actions.
     * @since 1.0.0
     * @memberof Tonic
     * @returns {void}
     */
    do(...actions) {
        this.#interface.do(this, actions);
    }

    /**
     * Make a WP REST request.
     *
     * This function handles success data using the `completion`
     * and appends errors automatically.s
     *
     * @param {any} trigger The selector of the DOM element
     * triggering the action.
     * @param {String} path The API path.
     * @param {Object} data The array of data to be included in the request.
     * @param {Function} completion The actions to perform when the
     * response was successful.
     * @param {Boolean} handle Whether to handle the response automatically.
     *
     * @author Alexandros Raikos <alexandros@dood.gr>
     * @since 1.0.0
     */
    request(
        trigger,
        path,
        data,
        completion
    ) {
        this.#api.request(
            trigger,
            path,
            data,
            completion,
        )
    }

    /**
     * Generate a notification.
     * 
     * @param {String} message The message.
     * @param {String} type The type. (error, notice)
     * @param {Boolean} disappearing  Whether the notification should disappear.
     * @since 1.0.0
     * @static
     * @memberof Tonic
     * @returns {void}
     */
    notify(message, type = 'error', disappearing = true) {
        notify(message, type, disappearing)
    }

    /**
     * Generate a modal.
     * 
     * @param {String} identifier The identifier for the modal.
     * @param {any} data The data for the modal.
     * @param {int} index The index for the modal.
     * @param {Function} completion The completion function for the modal.
     * @param {Boolean} fullCanvas Whether the modal should be full canvas.
     * @returns {Modal} The modal.
     * @since 1.0.0
     * @static
     * @memberof Tonic
     */
    modal(
        identifier,
        data,
        index = 0,
        completion = null,
        fullCanvas = false
    ) {
        return new Modal(identifier, data, index, completion, fullCanvas)
    }

    /**
     * Translate a string.
     * 
     * @param {String} text 
     * @returns {String} The translated string.
     * @since 1.0.0
     * @static
     * @memberof Tonic
     */
    translate(text) {
        return TonicJSProperties.translations[text].translations[0] || text;
    }
}

export default Tonic;