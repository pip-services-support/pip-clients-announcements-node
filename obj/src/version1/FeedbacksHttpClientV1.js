"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class AnnouncementsHttpClientV1 extends pip_services_net_node_1.CommandableHttpClient {
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
    getAnnouncementById(correlationId, announcementId, callback) {
        this.callCommand('get_announcement_by_id', correlationId, {
            announcement_id: announcementId
        }, callback);
    }
    createAnnouncement(correlationId, announcement, user, callback) {
        this.callCommand('create_announcement', correlationId, {
            announcement: announcement,
            user: user
        }, callback);
    }
    updateAnnouncement(correlationId, announcementId, update, user, callback) {
        this.callCommand('update_announcement', correlationId, {
            announcement_id: announcementId,
            update: update,
            user: user
        }, callback);
    }
    deleteAnnouncementById(correlationId, announcementId, callback) {
        let timing = this.instrument(correlationId, 'announcements.delete_announcement_by_id');
        this.callCommand('delete_announcement_by_id', correlationId, {
            announcement_id: announcementId
        }, callback);
    }
}
exports.AnnouncementsHttpClientV1 = AnnouncementsHttpClientV1;
//# sourceMappingURL=AnnouncementsHttpClientV1.js.map