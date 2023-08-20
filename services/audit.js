const { EventEmitter } = require("events");
const { Audit } = require("../models/auditModel");
const { query, queriesList } = require("../db/dbQuery");
const Logger = require("../services/logger");
const { dateFormat } = require("../utils/utils");
//add JSDoc to the following class  and its methods

/**
 * @class AuditEventService
 * @description This class is used to emit audit events 
 * @extends EventEmitter
 * @method audit: This method is used to emit audit events
 * @method addAudit: This method is used to insert audit events into the database
 */
class AuditEventService extends EventEmitter {
  constructor() {
    super();
    this.on("audit", this.addAudit);
    this.logger = new Logger("auditEventService");
  }
  audit(audiAction, data, error, auditBy) {
    let status = 200;
    if (error) status = 500;
    const auditOn = dateFormat();
    const auditObj = new Audit(
      audiAction,
      data,
      status,
      error,
      auditBy,
      auditOn
    );
    this.emit("audit", auditObj);
  }
  addAudit = async (auditObj) => {
    try {
      const dbRes = await query(queriesList.ADD_AUDIT, [
        auditObj.auditAction,
        JSON.stringify(auditObj.data),
        auditObj.status,
        auditObj.error,
        auditObj.auditBy,
        auditObj.auditOn,
      ]);
      this.logger.debug("audit inserted successfully", dbRes);
    } catch (err) {
      this.logger.error("failed to insert audit", err);
    }
  };
}

module.exports = new AuditEventService();
