"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var Version1 = require('../version1');
var AnnouncementsFactory = (function (_super) {
    __extends(AnnouncementsFactory, _super);
    function AnnouncementsFactory() {
        _super.call(this, pip_services_runtime_node_2.DefaultFactory.Instance);
        this.register(Version1.AnnouncementsRestClient.Descriptor, Version1.AnnouncementsRestClient);
        this.register(Version1.AnnouncementsSenecaClient.Descriptor, Version1.AnnouncementsSenecaClient);
        this.register(Version1.AnnouncementsLambdaClient.Descriptor, Version1.AnnouncementsLambdaClient);
    }
    AnnouncementsFactory.Instance = new AnnouncementsFactory();
    return AnnouncementsFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.AnnouncementsFactory = AnnouncementsFactory;
