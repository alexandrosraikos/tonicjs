/**
 *
 */
class Binding {
  /**
     *
     * @param {string} eventType
     * @param {string} actionID
     * @param {Function} method
     */
  constructor(eventType, actionID, method) {
    this.eventType = eventType;
    this.actionID = actionID;
    this.method = method;
  }
}

export default Binding;
