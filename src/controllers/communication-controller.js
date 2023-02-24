
import {notify} from '../functions/base';

/**
   * The communication controller.
   *
   * This class provides properties and methods to interact with the
   * WordPress installation.
   *
   * @since 0.0.1
   */
class API {
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
  static request(
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
          response.responseJSON.message,
          'error',
      );
      $(trigger).removeClass('loading');
    });
  }
}

export default API;
