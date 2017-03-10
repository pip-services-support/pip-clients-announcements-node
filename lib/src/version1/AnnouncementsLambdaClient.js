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
var AnnouncementsLambdaClient = (function (_super) {
    __extends(AnnouncementsLambdaClient, _super);
    function AnnouncementsLambdaClient(config) {
        _super.call(this, AnnouncementsLambdaClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    AnnouncementsLambdaClient.prototype.getAnnouncements = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'announces.get_announcements', callback);
        this.call('get_announcements', {
            correlation_id: correlationId,
            filter: filter,
            paging: paging
        }, callback);
    };
    AnnouncementsLambdaClient.prototype.getRandomAnnouncement = function (correlationId, filter, callback) {
        callback = this.instrument(correlationId, 'announces.get_random_announcement', callback);
        this.call('get_random_announcement', {
            correlation_id: correlationId,
            filter: filter
        }, callback);
    };
    AnnouncementsLambdaClient.prototype.getAnnouncementById = function (correlationId, announcementId, callback) {
        callback = this.instrument(correlationId, 'announces.get_announcement_by_id', callback);
        this.call('get_announcement_by_id', {
            correlation_id: correlationId,
            announcement_id: announcementId
        }, callback);
    };
    AnnouncementsLambdaClient.prototype.createAnnouncement = function (correlationId, announcement, callback) {
        callback = this.instrument(correlationId, 'announces.create_announcement', callback);
        this.call('create_announcement', {
            correlation_id: correlationId,
            announcement: announcement
        }, callback);
    };
    AnnouncementsLambdaClient.prototype.updateAnnouncement = function (correlationId, announcementId, announcement, callback) {
        callback = this.instrument(correlationId, 'announces.update_announcement', callback);
        this.call('update_announcement', {
            correlation_id: correlationId,
            announcement_id: announcementId,
            announcement: announcement
        }, callback);
    };
    AnnouncementsLambdaClient.prototype.deleteAnnouncement = function (correlationId, announcementId, callback) {
        callback = this.instrument(correlationId, 'announces.delete_announcement', callback);
        this.call('delete_announcement', {
            correlation_id: correlationId,
            announcement_id: announcementId
        }, callback);
    };
    /**
     * Unique descriptor for the AnnouncementsLambdaClient component
     */
    AnnouncementsLambdaClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-announces", "lambda", "1.0");
    return AnnouncementsLambdaClient;
}(pip_services_runtime_node_5.LambdaClient));
exports.AnnouncementsLambdaClient = AnnouncementsLambdaClient;
