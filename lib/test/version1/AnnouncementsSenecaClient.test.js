"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var AnnouncementsMemoryPersistence = require('pip-services-announces/lib/src/persistence/AnnouncementsMemoryPersistence').AnnouncementsMemoryPersistence;
var AnnouncementsController = require('pip-services-announces/lib/src/logic/AnnouncementsController').AnnouncementsController;
var AnnouncementsSenecaService = require('pip-services-announces/lib/src/services/version1/AnnouncementsSenecaService').AnnouncementsSenecaService;
var pip_clients_storage_node_1 = require('pip-clients-storage-node');
var StorageNullClient = pip_clients_storage_node_1.Version1.StorageNullClient;
var AnnouncementsSenecaClient_1 = require('../../src/version1/AnnouncementsSenecaClient');
var AnnouncementsClientFixture_1 = require('./AnnouncementsClientFixture');
suite('AnnouncementsSenecaClient', function () {
    var db = new AnnouncementsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new AnnouncementsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new AnnouncementsSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var client = new AnnouncementsSenecaClient_1.AnnouncementsSenecaClient();
    client.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_4.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var storage = new StorageNullClient();
    storage.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, client, storage, service, seneca);
    var fixture = new AnnouncementsClientFixture_1.AnnouncementsClientFixture(client);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_3.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});
