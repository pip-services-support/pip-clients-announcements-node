import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

let Version1 = require('../version1');

export class AnnouncementsFactory extends ComponentFactory {
	public static Instance: AnnouncementsFactory = new AnnouncementsFactory();
	
	constructor() {
		super(DefaultFactory.Instance);

		this.register(Version1.AnnouncementsRestClient.Descriptor, Version1.AnnouncementsRestClient);
		this.register(Version1.AnnouncementsSenecaClient.Descriptor, Version1.AnnouncementsSenecaClient);
		this.register(Version1.AnnouncementsLambdaClient.Descriptor, Version1.AnnouncementsLambdaClient);
	}	
}
