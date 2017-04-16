let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { AnnouncementsMemoryPersistence } from 'pip-services-announcements-node';
import { AnnouncementsController } from 'pip-services-announcements-node';
import { AnnouncementsSenecaServiceV1 } from 'pip-services-announcements-node';
import { IAnnouncementsClientV1 } from '../../src/version1/IAnnouncementsClientV1';
import { AnnouncementsSenecaClientV1 } from '../../src/version1/AnnouncementsSenecaClientV1';
import { AnnouncementsClientFixtureV1 } from './AnnouncementsClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('AnnouncementsSenecaClient', () => {
    let service: AnnouncementsSenecaServiceV1;
    let client: AnnouncementsSenecaClientV1;
    let fixture: AnnouncementsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new AnnouncementsMemoryPersistence();
        let controller = new AnnouncementsController();

        service = new AnnouncementsSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-announcements', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-announcements', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-announcements', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new AnnouncementsSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

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
