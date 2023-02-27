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
    // Attach handlers.
    $(document).on(
        binding.eventType,
        `.${this.selector} *[data-tonic-action-id="${binding.actionID}"],\
              .${this.selector}[data-tonic-action-id="${binding.actionID}"]`,
        binding.method,
    );
  }
    
  /**
   * Attach multiple bindings.
   * 
   * @param {Object} actions 
   * @param {Tonic} controller 
   * @returns 
   */
  do(actions, controller) {
    Object.keys(actions).forEach((action) => {
        this.attach(
            new Binding(
              $('*[data-tonic-action-id="'+this.selector+'-'+action+'"]').data('tonic-event'),
              this.selector+'-'+action,
              e => actions[action](e, controller)
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
