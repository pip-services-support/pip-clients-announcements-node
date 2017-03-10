let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { IAnnouncementsClient } from '../../src/version1/IAnnouncementsClient';

let ANNOUNCEMENT1 = {
    id: '1',
    category: 'maintenance',
    creator: {
        id: '1',
        name: 'Test User'
    },
    title: {en: 'Announcement 1'},
    content: 'Sample Announcement #1'
};
let ANNOUNCEMENT2 = {
    id: '2',
    tags: ['TAG 1'],
    category: 'maintenance',
    creator: {
        id: '1',
        name: 'Test User'
    },
    title: {en: 'Announcement 2'},
    content: 'Sample Announcement #2'
};

export class AnnouncementsClientFixture {
    private _client: IAnnouncementsClient;
    
    constructor(client: IAnnouncementsClient) {
        this._client = client;
    }
        
    testCrudOperations(done) {
        var announcement1, announcement2;

        async.series([
        // Create one announcement
            (callback) => {
                this._client.createAnnouncement(
                    null,
                    ANNOUNCEMENT1,
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.category, ANNOUNCEMENT1.category);
                        assert.equal(announcement.content, ANNOUNCEMENT1.content);

                        announcement1 = announcement;

                        callback();
                    }
                );
            },
        // Create another announcement
            (callback) => {
                this._client.createAnnouncement(
                    null,
                    ANNOUNCEMENT2,
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.category, ANNOUNCEMENT2.category);
                        assert.equal(announcement.content, ANNOUNCEMENT2.content);

                        announcement2 = announcement;

                        callback();
                    }
                );
            },
        // Get all announcements
            (callback) => {
                this._client.getAnnouncements(
                    null,
                    {},
                    {},
                    (err, announcements) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcements);
                        assert.lengthOf(announcements.data, 2);

                        callback();
                    }
                );
            },
        // Get random announcement
            (callback) => {
                this._client.getRandomAnnouncement(
                    null,
                    {},
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);

                        callback();
                    }
                );
            },
        // Update the announcement
            (callback) => {
                this._client.updateAnnouncement(
                    null,
                    announcement1.id,
                    { content: 'Updated Content 1' },
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.content, 'Updated Content 1');
                        assert.equal(announcement.category, ANNOUNCEMENT1.category);

                        announcement1 = announcement;

                        callback();
                    }
                );
            },
        // Delete announcement
            (callback) => {
                this._client.deleteAnnouncement(
                    null,
                    announcement1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete announcement
            (callback) => {
                this._client.getAnnouncementById(
                    null,
                    announcement1.id,
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isNull(announcement || null);

                        callback();
                    }
                );
            }
        ], done);
    }
}
