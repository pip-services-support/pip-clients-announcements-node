"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var AnnouncementsRestClient = (function (_super) {
    __extends(AnnouncementsRestClient, _super);
    function AnnouncementsRestClient(config) {
        _super.call(this, AnnouncementsRestClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    AnnouncementsRestClient.prototype.getAnnouncements = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'announces.get_announcements', callback);
        var params = {};
        this.addCorrelationId(params, correlationId);
        this.addFilterParams(params, filter);
        this.addPagingParams(params, paging);
        this.call('get', '/announcements', params, callback);
    };
    AnnouncementsRestClient.prototype.getRandomAnnouncement = function (correlationId, filter, callback) {
        callback = this.instrument(correlationId, 'announces.get_random_announcement', callback);
        var params = {};
        this.addCorrelationId(params, correlationId);
        this.addFilterParams(params, filter);
        this.call('get', '/announcements/random', params, callback);
    };
    AnnouncementsRestClient.prototype.getAnnouncementById = function (correlationId, announcementId, callback) {
        callback = this.instrument(correlationId, 'announces.get_announcement_by_id', callback);
        this.call('get', '/announcements/' + announcementId, {
            correlation_id: correlationId
        }, callback);
    };
    AnnouncementsRestClient.prototype.createAnnouncement = function (correlationId, announcement, callback) {
        callback = this.instrument(correlationId, 'announces.create_announcement', callback);
        this.call('post', '/announcements', {
            correlation_id: correlationId
        }, announcement, callback);
    };
    AnnouncementsRestClient.prototype.updateAnnouncement = function (correlationId, announcementId, announcement, callback) {
        callback = this.instrument(correlationId, 'announces.update_announcement', callback);
        this.call('put', '/announcements/' + announcementId, {
            correlation_id: correlationId
        }, announcement, callback);
    };
    AnnouncementsRestClient.prototype.deleteAnnouncement = function (correlationId, announcementId, callback) {
        callback = this.instrument(correlationId, 'announces.delete_announcement', callback);
        this.call('delete', '/announcements/' + announcementId, {
            correlation_id: correlationId
        }, callback);
    };
    /**
     * Unique descriptor for the AnnouncementsRestClient component
     */
    AnnouncementsRestClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-announces", "rest", "1.0");
    return AnnouncementsRestClient;
}(pip_services_runtime_node_5.RestClient));
exports.AnnouncementsRestClient = AnnouncementsRestClient;
