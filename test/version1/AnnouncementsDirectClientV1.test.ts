let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { AnnouncementsMemoryPersistence } from 'pip-services-announcements-node';
import { AnnouncementsController } from 'pip-services-announcements-node';
import { IAnnouncementsClientV1 } from '../../src/version1/IAnnouncementsClientV1';
import { AnnouncementsDirectClientV1 } from '../../src/version1/AnnouncementsDirectClientV1';
import { AnnouncementsClientFixtureV1 } from './AnnouncementsClientFixtureV1';

suite('AnnouncementsDirectClientV1', ()=> {
    let client: AnnouncementsDirectClientV1;
    let fixture: AnnouncementsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new AnnouncementsMemoryPersistence();
        let controller = new AnnouncementsController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-announcements', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-announcements', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new AnnouncementsDirectClientV1();
        client.setReferences(references);

        fixture = new AnnouncementsClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
