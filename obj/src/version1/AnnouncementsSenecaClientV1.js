"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class AnnouncementsSenecaClientV1 extends pip_services_net_node_1.CommandableSenecaClient {
    constructor(config) {
        super('announcements');
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getAnnouncements(correlationId, filter, paging, callback) {
        this.callCommand('get_announcements', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    getRandomAnnouncement(correlationId, filter, callback) {
        this.callCommand('get_random_announcement', correlationId, {
            filter: filter
        }, callback);
    }
    getAnnouncementById(correlationId, announcementId, callback) {
        this.callCommand('get_announcement_by_id', correlationId, {
            announcement_id: announcementId
        }, callback);
    }
    createAnnouncement(correlationId, announcement, callback) {
        this.callCommand('create_announcement', correlationId, {
            announcement: announcement,
        }, callback);
    }
    updateAnnouncement(correlationId, announcement, callback) {
        this.callCommand('update_announcement', correlationId, {
            announcement: announcement,
        }, callback);
    }
    deleteAnnouncementById(correlationId, announcementId, callback) {
        let timing = this.instrument(correlationId, 'announcements.delete_announcement_by_id');
        this.callCommand('delete_announcement_by_id', correlationId, {
            announcement_id: announcementId
        }, callback);
    }
}
exports.AnnouncementsSenecaClientV1 = AnnouncementsSenecaClientV1;
//# sourceMappingURL=AnnouncementsSenecaClientV1.js.map