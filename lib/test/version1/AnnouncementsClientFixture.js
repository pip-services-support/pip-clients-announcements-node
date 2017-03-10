"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var ANNOUNCEMENT1 = {
    id: '1',
    category: 'maintenance',
    creator: {
        id: '1',
        name: 'Test User'
    },
    title: { en: 'Announcement 1' },
    content: 'Sample Announcement #1'
};
var ANNOUNCEMENT2 = {
    id: '2',
    tags: ['TAG 1'],
    category: 'maintenance',
    creator: {
        id: '1',
        name: 'Test User'
    },
    title: { en: 'Announcement 2' },
    content: 'Sample Announcement #2'
};
var AnnouncementsClientFixture = (function () {
    function AnnouncementsClientFixture(client) {
        this._client = client;
    }
    AnnouncementsClientFixture.prototype.testCrudOperations = function (done) {
        var _this = this;
        var announcement1, announcement2;
        async.series([
            // Create one announcement
            function (callback) {
                _this._client.createAnnouncement(null, ANNOUNCEMENT1, function (err, announcement) {
                    assert.isNull(err);
                    assert.isObject(announcement);
                    assert.equal(announcement.category, ANNOUNCEMENT1.category);
                    assert.equal(announcement.content, ANNOUNCEMENT1.content);
                    announcement1 = announcement;
                    callback();
                });
            },
            // Create another announcement
            function (callback) {
                _this._client.createAnnouncement(null, ANNOUNCEMENT2, function (err, announcement) {
                    assert.isNull(err);
                    assert.isObject(announcement);
                    assert.equal(announcement.category, ANNOUNCEMENT2.category);
                    assert.equal(announcement.content, ANNOUNCEMENT2.content);
                    announcement2 = announcement;
                    callback();
                });
            },
            // Get all announcements
            function (callback) {
                _this._client.getAnnouncements(null, {}, {}, function (err, announcements) {
                    assert.isNull(err);
                    assert.isObject(announcements);
                    assert.lengthOf(announcements.data, 2);
                    callback();
                });
            },
            // Get random announcement
            function (callback) {
                _this._client.getRandomAnnouncement(null, {}, function (err, announcement) {
                    assert.isNull(err);
                    assert.isObject(announcement);
                    callback();
                });
            },
            // Update the announcement
            function (callback) {
                _this._client.updateAnnouncement(null, announcement1.id, { content: 'Updated Content 1' }, function (err, announcement) {
                    assert.isNull(err);
                    assert.isObject(announcement);
                    assert.equal(announcement.content, 'Updated Content 1');
                    assert.equal(announcement.category, ANNOUNCEMENT1.category);
                    announcement1 = announcement;
                    callback();
                });
            },
            // Delete announcement
            function (callback) {
                _this._client.deleteAnnouncement(null, announcement1.id, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to get delete announcement
            function (callback) {
                _this._client.getAnnouncementById(null, announcement1.id, function (err, announcement) {
                    assert.isNull(err);
                    assert.isNull(announcement || null);
                    callback();
                });
            }
        ], done);
    };
    return AnnouncementsClientFixture;
}());
exports.AnnouncementsClientFixture = AnnouncementsClientFixture;
