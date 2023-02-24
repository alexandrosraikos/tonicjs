
/**
 * The Modal class, which refers to the given modal in the DOM.
 *
 * @since 0.0.1
 */
class Modal {
  /**
     * The Modal class constructor.
     * @param {String} identifier The unique ID of the modal.
     * @param {String} data The data structure of the modal's content.
     * @param {Number} index The given active index.
     * @param {Function} completion The callback function to call
     *  after each view is set.
     * @param {Boolean} fullCanvas Whether the close button is absolute
     *  and shown on hover.
     */
  constructor(
      classSelector,
      data,
      index = 0,
      completion = null,
      fullCanvas = false,
  ) {
    this.id = classSelector;
    this.data = data;
    this.index = index ?? 0;
    this.iterable = this.data.constructor === Array;
    this.completion = completion;

    // Create navigation buttons.
    let previousButton = '';
    let nextButton = '';
    if (this.iterable) {
      previousButton = `
        <button class="previous tactile" ${this.index - 1 < 0 ? 'disabled' : ''}>
          <span class="fas fa-chevron-left"></span>
        </button>`;
      nextButton = `
        <button 
          class="next tactile" 
          ${this.index + 2 > this.data.length ? 'disabled' : ''}>
          <span class="fas fa-chevron-right"></span>
        </button>`;
    }

    // Prepare HTML.
    this.HTML = `
        <div 
          class="${this.id} ${this.id}-modal ${this.id}-hidden">
          <div class="backdrop"></div>
          <div class="container ${fullCanvas ? 'full-canvas' : ''}">
            ${previousButton}
            <button class="close" title="Close">
              <span class="fas fa-times"></span>
            </button>
            <div class="content">
            </div>
            ${nextButton}
          </div>
        </div>
      `;

    // Stop body scrolling.
    $('html, body').css({overflow: 'hidden'});

    // Append to document body.
    $('body').append(this.HTML);

    // Append data.
    this.set(this.iterable ? this.data[index] : this.data);

    // Show modal.
    $('.'+this.id+'-modal.' + this.type).removeClass('hidden');

    /**
       * Listeners
       * ----------
       */

    $(document).ready(() => {
      // Iterate through content on button click.
      if (this.iterable) {
        // Set next on click.
        this.controls.next().on('click', () => {
          this.next();
        });
        // Set next on right arrow key press.
        $(document).on('keydown', (e) => {
          if (e.key === 'ArrowRight') this.next();
        });

        // Set next.
        this.controls.previous().on('click', () => {
          this.previous();
        });
        // Set previous on left arrow key press.
        $(document).on('keydown', (e) => {
          if (e.key === 'ArrowLeft') this.previous();
        });
      }

      // Dismiss modal on button click.
      $(document).on(
          'click',
          // eslint-disable-next-line max-len
          '.'+this.id+'-modal button[data-action="close_modal"]',
          (e) => {
            e.preventDefault();
            this.hide();
          },
      );

      $('.'+this.id+'-modal> .container > .close').on(
          'click',
          (e) => {
            e.preventDefault();
            this.hide();
          },
      );

      $('.'+this.id+'-modal> .backdrop').on('click', (e) => {
        e.preventDefault();
        this.hide();
      });

      // Dismiss modal on 'Escape' key press.
      $(document).on('keydown', (e) => {
        if (e.key === 'Escape') this.hide();
      });
    });
  }

  /**
     * References
     * ----------
     */

  /**
     * The modal's content reference.
     *
     * @return {jQuery} The content element reference.
     */
  content = () => {
    return $('.'+this.id+'-modal > .container > .content');
  };

  /**
     * The modal's controls reference.
     */
  controls = {
    previous: () => {
      return $(
        '.'+this.id+'-modal > .container > .previous');
    },
    next: () => {
      return $('.'+this.id+'-modal > .container > .next');
    },
  };

  /**
     * Methods
     * ----------
     */

  /**
     * Adds the `hidden` class to a given modal.
     * @param {Event} e The event.
     */
  hide() {
    $('.'+this.id+'-modal').remove();
    $('html, body').css({overflow: 'auto'});
  }

  /**
     * Destroy any modal.
     * @param {string} id The identifier of the modal
     */
  static kill(id) {
    $('.'+this.id+'-modal').remove();
    $('html, body').css({overflow: 'auto'});
  }

  /**
     * Set the control buttons disabled status.
     *
     * @param {Boolean} previousState Whether there is a previous state.
     * @param {Boolean} nextState Whether there is a next state.
     */
  setControls(previousState, nextState) {
    this.controls.previous().prop('disabled', !previousState);
    this.controls.next().prop('disabled', !nextState);
  }

  /**
     * Clear previous content and append new.
     *
     * @param { HTMLElement } data The HTML data to append to the view.
     */
  set(data) {
    this.content().empty();
    this.content().append(data);
    if (this.completion) {
      this.completion(this.content().children()[0]);
    }
  }

  /**
     * Replace content in the view with the previous
     * in the content set.
     */
  previous() {
    if (this.index >= 1) {
      this.index = this.index - 1 < 0 ? this.data.length - 1 : this.index - 1;
      this.set(this.data[this.index]);
      this.setControls(
          this.index - 1 >= 0,
          !(this.controls.next() === false),
      );
    }
  }

  /**
     * Replace content in the view with the next
     * in the content set.
     */
  next() {
    if (this.index + 1 <= this.data.length - 1) {
      this.index = this.index + 1 > this.data.length - 1 ? 0 : this.index + 1;
      this.set(this.data[this.index]);
      this.setControls(
          !(this.controls.previous() === false),
          this.index + 1 <= this.data.length - 1,
      );
    }
  }
}


export default Modal;
