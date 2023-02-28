
import {notify} from '../functions/base.js';

/**
   * The communication controller.
   *
   * This class provides properties and methods to interact with the
   * WordPress installation.
   *
   * @since 1.0.0
   */
class API {

  /**
   * The identifier of the controller.
   * @type {String}
   * @since 1.1.3
   * @access private
   */
  #identifier;

  /**
   * The constructor.
   * @param {String} identifier The identifier of the controller.
   * @since 1.1.3
   * @access public
   */
  constructor(identifier) {
    this.#identifier = identifier;
  }
  
  /**
   * Make a WP request.
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
      completion,
  ) {
    // Toggle the loading indicator.
    $(trigger).addClass('loading');

    window.wp.apiRequest(
        {
          path: path,
          data: data,
        },
    ).done( (data) => {
      completion(data);
      $(trigger).removeClass('loading');
    }).fail((response) => {
      notify(
          this.#identifier,
          response.responseText,
          'error',
      );
      $(trigger).removeClass('loading');
    });
  }
}

export default API;
