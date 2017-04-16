let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { MultiString } from 'pip-services-commons-node';

import { IAnnouncementsClientV1 } from '../../src/version1/IAnnouncementsClientV1';
import { PartyReferenceV1 } from '../../src/version1/PartyReferenceV1';
import { AnnouncementV1 } from '../../src/version1/AnnouncementV1';

let ANNOUNCEMENT1 = <AnnouncementV1>{
    id: '1',
    category: 'maintenance',
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: <MultiString>{ en: 'Announcement 1' },
    content: <MultiString>{ en: 'Sample Announcement #1' }
};
let ANNOUNCEMENT2 = <AnnouncementV1>{
    id: '2',
    tags: ['TAG 1'],
    category: 'maintenance',
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: <MultiString>{ en: 'Announcement 2' },
    content: <MultiString>{ en: 'Sample Announcement #2' }
};

export class AnnouncementsClientFixtureV1 {
    private _client: IAnnouncementsClientV1;
    
    constructor(client: IAnnouncementsClientV1) {
        this._client = client;
    }
        
    public testCrudOperations(done) {
        let announcement1, announcement2;

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
                        assert.equal(announcement.content.en, ANNOUNCEMENT1.content.en);

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
                        assert.equal(announcement.content.en, ANNOUNCEMENT2.content.en);

                        announcement2 = announcement;

                        callback();
                    }
                );
            },
        // Get all announcements
            (callback) => {
                this._client.getAnnouncements(
                    null, null, null,
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the announcement
            (callback) => {
                announcement1.content = <MultiString>{ en: 'Updated Content 1' };

                this._client.updateAnnouncement(
                    null,
                    announcement1,
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.content.en, 'Updated Content 1');
                        assert.equal(announcement.category, ANNOUNCEMENT1.category);

                        announcement1 = announcement;

                        callback();
                    }
                );
            },
        // Delete announcement
            (callback) => {
                this._client.deleteAnnouncementById(
                    null, announcement1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete announcement
            (callback) => {
                this._client.getAnnouncementById(
                    null, announcement1.id,
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
