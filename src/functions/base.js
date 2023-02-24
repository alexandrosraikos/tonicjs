
/**
 *
 * Display an alert overlay.
 *
 * @param {string} message The message that will be displayed in the alert.
 * @param {string} type The type of alert (either an `'error'` or `'notice'`)/
 * @param {Boolean} disappearing Whether the alert is
 * automatically disappearing.
 *
 * @author Alexandros Raikos <alexandros@araikos.gr>
 */
export function notify(message, type = 'error', disappearing = true) {
  const iconIdentifier =
    type === 'notice' ? 'fa-circle-exclamation' : 'fa-triangle-exclamation';
  const notice = `
    <div \
      class="gin-notice gin-${type} animated absolute">
      <span class="icon fas ${iconIdentifier}"></span>
      <span>${message}</span>
    </div>
  `;

  const exists = $('.gin-notice > span:last-of-type')
      .html() === message;

  if (!exists) {
    $('body').prepend(notice);
    if (disappearing) {
      setTimeout(() => {
        $('.gin-notice.absolute').addClass('seen');
      }, 7000);
      setTimeout(() => {
        $('.gin-notice.absolute').addClass('dismissed');
      }, 7200);
      setTimeout(() => {
        $('.gin-notice.absolute').remove();
      }, 7210);
    }
  }
}
