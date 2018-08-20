let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { AnnouncementsMemoryPersistence } from 'pip-services-announcements-node';
import { AnnouncementsController } from 'pip-services-announcements-node';
import { AnnouncementsHttpServiceV1 } from 'pip-services-announcements-node';
import { IAnnouncementsClientV1 } from '../../src/version1/IAnnouncementsClientV1';
import { AnnouncementsHttpClientV1 } from '../../src/version1/AnnouncementsHttpClientV1';
import { AnnouncementsClientFixtureV1 } from './AnnouncementsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('AnnouncementsHttpClientV1', ()=> {
    let service: AnnouncementsHttpServiceV1;
    let client: AnnouncementsHttpClientV1;
    let fixture: AnnouncementsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new AnnouncementsMemoryPersistence();
        let controller = new AnnouncementsController();

        service = new AnnouncementsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-announcements', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-announcements', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-announcements', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new AnnouncementsHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new AnnouncementsClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
