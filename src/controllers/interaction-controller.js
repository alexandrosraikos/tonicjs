import Binding from '../model/binding.js'

/**
 * The main display controller for all interface elements.
 *
 * This controller must be used by all classes which enable interface
 * and API and other communication interactions with the client.
 *
 * @since 0.0.1
 */
class InteractionController {

  constructor(classSelector) {
    this.selector = classSelector;
  }

  /**
   * Attach custom event handlers from
   * the predefined bindings.
   *
   * @param {Binding} binding The binding.
   */
  attach(binding) {
    const selector = `.${this.selector} *[data-tonic-action-id="${binding.actionID}"],\
    .${this.selector}[data-tonic-action-id="${binding.actionID}"]`;

    const attach = (customEvent) => $(document).on(
        customEvent ?? binding.eventType,
        selector,
        binding.method,
    );

    if (binding.eventType === 'lazy') {
      attach('tonicjs-lazy');
      $(selector).trigger('tonicjs-lazy');
    } else {
      // Attach handlers.
      attach();
    }
  }
    
  /**
   * Attach multiple bindings.
   * 
   * @param {Object} actions 
   * @param {Tonic} controller 
   * @returns 
   */
  do(controller, actions) {
    actions.forEach((action) => {
        const actionID = this.selector +'-' + Object.keys(action)[0];
        this.attach(
            new Binding(
              $('*[data-tonic-action-id="'+actionID+'"]').data('tonic-event'),
              actionID,
              e => action[Object.keys(action)[0]](e, controller)
          )
        )
    })
    return;
  }

  /**
   * Run an action automatically on page load.
   *
   * @param {Function} action The action.
   */
  run(action) {
    $(function() {
      action();
    });
  }
}

export default InteractionController;
