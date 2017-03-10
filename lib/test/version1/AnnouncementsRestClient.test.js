"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var AnnouncementsMemoryPersistence = require('pip-services-announces/lib/src/persistence/AnnouncementsMemoryPersistence').AnnouncementsMemoryPersistence;
var AnnouncementsController = require('pip-services-announces/lib/src/logic/AnnouncementsController').AnnouncementsController;
var AnnouncementsRestService = require('pip-services-announces/lib/src/services/version1/AnnouncementsRestService').AnnouncementsRestService;
var pip_clients_storage_node_1 = require('pip-clients-storage-node');
var StorageNullClient = pip_clients_storage_node_1.Version1.StorageNullClient;
var AnnouncementsRestClient_1 = require('../../src/version1/AnnouncementsRestClient');
var AnnouncementsClientFixture_1 = require('./AnnouncementsClientFixture');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.protocol', 'http', 'endpoint.host', 'localhost', 'endpoint.port', 3000);
suite('AnnouncementsRestClient', function () {
    var db = new AnnouncementsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new AnnouncementsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new AnnouncementsRestService();
    service.configure(restConfig);
    var client = new AnnouncementsRestClient_1.AnnouncementsRestClient();
    client.configure(restConfig);
    var storage = new StorageNullClient();
    storage.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service, storage, client);
    var fixture = new AnnouncementsClientFixture_1.AnnouncementsClientFixture(client);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});
