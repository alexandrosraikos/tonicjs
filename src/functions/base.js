
/**
 *
 * Display an alert overlay.
 *
 * @param {string} message The message that will be displayed in the alert.
 * @param {string} type The type of alert (either an `'error'` or `'notice'`)/
 * @param {Boolean} disappearing Whether the alert is
 * automatically disappearing.
 *
 * @author Alexandros Raikos <alexandros@dood.gr>
 */
export function notify(classSelector, message, type = 'error', disappearing = true, includeIcon = true) {
  let icon = '';
  if (includeIcon) {
    const iconIdentifier =
      type === 'notice' ? 'fa-circle-exclamation' : 'fa-triangle-exclamation';
    icon = `<span class="icon fas ${iconIdentifier}"></span>`;
  }
  const notice = `
    <div \
      class="${classSelector}-notice ${classSelector}-${type} animated absolute">
      ${icon}
      <span>${message}</span>
    </div>
  `;

  const exists = $(`.${classSelector}-notice > span:last-of-type`)
      .html() === message;

  if (!exists) {
    $('body').prepend(notice);
    if (disappearing) {
      setTimeout(() => {
        $(`.${classSelector}-notice.absolute`).addClass('seen');
      }, 7000);
      setTimeout(() => {
        $(`.${classSelector}-notice.absolute`).addClass('dismissed');
      }, 7200);
      setTimeout(() => {
        $(`.${classSelector}-notice.absolute`).remove();
      }, 7210);
    }
  }
}
