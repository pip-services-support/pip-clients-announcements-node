"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const AnnouncementsDirectClientV1_1 = require("../version1/AnnouncementsDirectClientV1");
const AnnouncementsHttpClientV1_1 = require("../version1/AnnouncementsHttpClientV1");
class AnnouncementsClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(AnnouncementsClientFactory.DirectClientV1Descriptor, AnnouncementsDirectClientV1_1.AnnouncementsDirectClientV1);
        this.registerAsType(AnnouncementsClientFactory.HttpClientV1Descriptor, AnnouncementsHttpClientV1_1.AnnouncementsHttpClientV1);
    }
}
AnnouncementsClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-announcements', 'factory', 'default', 'default', '1.0');
AnnouncementsClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-announcements', 'client', 'direct', 'default', '1.0');
AnnouncementsClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-announcements', 'client', 'http', 'default', '1.0');
exports.AnnouncementsClientFactory = AnnouncementsClientFactory;
//# sourceMappingURL=AnnouncementsClientFactory.js.map