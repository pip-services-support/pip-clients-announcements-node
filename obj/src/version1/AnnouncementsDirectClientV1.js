"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
//import { IAnnouncementsController } from 'pip-services-announcements-node';
class AnnouncementsDirectClientV1 extends pip_services_rpc_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services_commons_node_2.Descriptor("pip-services-announcements", "controller", "*", "*", "*"));
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getAnnouncements(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'announcements.get_announcements');
        this._controller.getAnnouncements(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getRandomAnnouncement(correlationId, filter, callback) {
        let timing = this.instrument(correlationId, 'announcements.get_random_announcement');
        this._controller.getAnnouncements(correlationId, filter, (err, announcement) => {
            timing.endTiming();
            callback(err, announcement);
        });
    }
    getAnnouncementById(correlationId, announcementId, callback) {
        let timing = this.instrument(correlationId, 'announcements.get_announcement_by_id');
        this._controller.getAnnouncementById(correlationId, announcementId, (err, announcement) => {
            timing.endTiming();
            callback(err, announcement);
        });
    }
    createAnnouncement(correlationId, announcement, callback) {
        let timing = this.instrument(correlationId, 'announcements.create_announcement');
        this._controller.createAnnouncement(correlationId, announcement, (err, announcement) => {
            timing.endTiming();
            callback(err, announcement);
        });
    }
    updateAnnouncement(correlationId, announcement, callback) {
        let timing = this.instrument(correlationId, 'announcements.update_announcement');
        this._controller.updateAnnouncement(correlationId, announcement, (err, announcement) => {
            timing.endTiming();
            callback(err, announcement);
        });
    }
    deleteAnnouncementById(correlationId, announcementId, callback) {
        let timing = this.instrument(correlationId, 'announcements.delete_announcement_by_id');
        this._controller.deleteAnnouncementById(correlationId, announcementId, (err, announcement) => {
            timing.endTiming();
            callback(err, announcement);
        });
    }
}
exports.AnnouncementsDirectClientV1 = AnnouncementsDirectClientV1;
//# sourceMappingURL=AnnouncementsDirectClientV1.js.map