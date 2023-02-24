import API from './communication-controller.js';

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
        `.${this.selector} *[data-action="${binding.actionID}"],\
              .${this.selector}[data-action="${binding.actionID}"]`,
        binding.method,
    );
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

  /**
   * Make a request using the standard event handling.
   *
   * @param {Event} e The event.
   * @param {String} path The API path.
   * @param {Object|FormData} data The request data.
   * @param {Function} completion The successful completion handler.
   */
  directRequest(e, path, data, completion) {
    if (e instanceof Event) {
      e.preventDefault();
    }
    API.request(e.currentTarget, path, data, completion);
  }
}

export default InteractionController;
