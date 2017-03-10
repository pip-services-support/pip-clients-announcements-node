let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';

let AnnouncementsMemoryPersistence = require('pip-services-announces/lib/src/persistence/AnnouncementsMemoryPersistence').AnnouncementsMemoryPersistence;
let AnnouncementsController = require('pip-services-announces/lib/src/logic/AnnouncementsController').AnnouncementsController;
let AnnouncementsSenecaService = require('pip-services-announces/lib/src/services/version1/AnnouncementsSenecaService').AnnouncementsSenecaService;

import { Version1 as StorageVersion1 } from 'pip-clients-storage-node';
let StorageNullClient = StorageVersion1.StorageNullClient;

import { AnnouncementsSenecaClient } from '../../src/version1/AnnouncementsSenecaClient';
import { AnnouncementsClientFixture } from './AnnouncementsClientFixture';

suite('AnnouncementsSenecaClient', ()=> {        
    let db = new AnnouncementsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new AnnouncementsController();
    ctrl.configure(new ComponentConfig());

    let service = new AnnouncementsSenecaService();
    service.configure(new ComponentConfig());

    let client = new AnnouncementsSenecaClient();
    client.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let storage = new StorageNullClient();
    storage.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, client, storage, service, seneca);
    let fixture = new AnnouncementsClientFixture(client);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});