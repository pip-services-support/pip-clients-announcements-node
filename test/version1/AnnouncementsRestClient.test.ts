let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { MicroserviceConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';
import { Builder } from 'pip-services-runtime-node';

let AnnouncementsMemoryPersistence = require('pip-services-announces/lib/src/persistence/AnnouncementsMemoryPersistence').AnnouncementsMemoryPersistence;
let AnnouncementsController = require('pip-services-announces/lib/src/logic/AnnouncementsController').AnnouncementsController;
let AnnouncementsRestService = require('pip-services-announces/lib/src/services/version1/AnnouncementsRestService').AnnouncementsRestService;

import { Version1 as StorageVersion1 } from 'pip-clients-storage-node';
let StorageNullClient = StorageVersion1.StorageNullClient;

import { AnnouncementsRestClient } from '../../src/version1/AnnouncementsRestClient';
import { AnnouncementsClientFixture } from './AnnouncementsClientFixture';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.protocol', 'http',
    'endpoint.host', 'localhost',
    'endpoint.port', 3000
);

suite('AnnouncementsRestClient', ()=> {    
    let db = new AnnouncementsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new AnnouncementsController();
    ctrl.configure(new ComponentConfig());

    let service = new AnnouncementsRestService();
    service.configure(restConfig);

    let client = new AnnouncementsRestClient();
    client.configure(restConfig);

    let storage = new StorageNullClient();
    storage.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, service, storage, client);
    let fixture = new AnnouncementsClientFixture(client);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});