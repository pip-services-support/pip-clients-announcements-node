import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-components-node';

import { AnnouncementsDirectClientV1 } from '../version1/AnnouncementsDirectClientV1';
import { AnnouncementsHttpClientV1 } from '../version1/AnnouncementsHttpClientV1';
import { AnnouncementsSenecaClientV1 } from '../version1/AnnouncementsSenecaClientV1';

export class AnnouncementsClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-announcements', 'factory', 'default', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-announcements', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-announcements', 'client', 'http', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-announcements', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(AnnouncementsClientFactory.DirectClientV1Descriptor, AnnouncementsDirectClientV1);
		this.registerAsType(AnnouncementsClientFactory.HttpClientV1Descriptor, AnnouncementsHttpClientV1);
		this.registerAsType(AnnouncementsClientFactory.SenecaClientV1Descriptor, AnnouncementsSenecaClientV1);
	}
	
}
