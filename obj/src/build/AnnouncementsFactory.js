"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const AnnouncementsDirectClientV1_1 = require("../version1/AnnouncementsDirectClientV1");
const AnnouncementsHttpClientV1_1 = require("../version1/AnnouncementsHttpClientV1");
const AnnouncementsSenecaClientV1_1 = require("../version1/AnnouncementsSenecaClientV1");
class AnnouncementsFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(AnnouncementsFactory.DirectClientV1Descriptor, AnnouncementsDirectClientV1_1.AnnouncementsDirectClientV1);
        this.registerAsType(AnnouncementsFactory.HttpClientV1Descriptor, AnnouncementsHttpClientV1_1.AnnouncementsHttpClientV1);
        this.registerAsType(AnnouncementsFactory.SenecaClientV1Descriptor, AnnouncementsSenecaClientV1_1.AnnouncementsSenecaClientV1);
    }
}
AnnouncementsFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-announcements', 'factory', 'default', 'default', '1.0');
AnnouncementsFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-announcements', 'client', 'direct', 'default', '1.0');
AnnouncementsFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-announcements', 'client', 'http', 'default', '1.0');
AnnouncementsFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-announcements', 'client', 'seneca', 'default', '1.0');
exports.AnnouncementsFactory = AnnouncementsFactory;
//# sourceMappingURL=AnnouncementsFactory.js.map