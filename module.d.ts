declare module 'pip-clients-announces-node' {
	import { IClient } from 'pip-services-runtime-node';
	import { RestClient } from 'pip-services-runtime-node';
	import { LambdaClient } from 'pip-services-runtime-node';
	import { SenecaClient } from 'pip-services-runtime-node';
	import { ComponentDescriptor } from 'pip-services-runtime-node';
	import { ComponentFactory } from 'pip-services-runtime-node';

    export class AnnouncementsFactory extends ComponentFactory {
        public static Instance: AnnouncementsFactory;	
        constructor();	
    }

    module Version1 {
        export interface IAnnouncementsClient extends IClient {
            getAnnouncements(correlationId: string, filter: any, paging: any, callback: any): void;
            getRandomAnnouncement(correlationId: string, filter: any, callback: any): void;
            getAnnouncementById(correlationId: string, announcementId: string, callback: any): void;
            createAnnouncement(correlationId: string, announcement: any, callback: any): void;
            updateAnnouncement(correlationId: string, announcementId: string, announcement: any, callback: any): void;
            deleteAnnouncement(correlationId: string, announcementId: string, callback: any): void;
        }

        export class AnnouncementsRestClient extends RestClient implements IAnnouncementsClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getAnnouncements(correlationId: string, filter: any, paging: any, callback: any): void;
            getRandomAnnouncement(correlationId: string, filter: any, callback: any): void;
            getAnnouncementById(correlationId: string, announcementId: string, callback: any): void;
            createAnnouncement(correlationId: string, announcement: any, callback: any): void;
            updateAnnouncement(correlationId: string, announcementId: string, announcement: any, callback: any): void;
            deleteAnnouncement(correlationId: string, announcementId: string, callback: any): void;
        }

        export class AnnouncementsLambdaClient extends LambdaClient implements IAnnouncementsClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getAnnouncements(correlationId: string, filter: any, paging: any, callback: any): void;
            getRandomAnnouncement(correlationId: string, filter: any, callback: any): void;
            getAnnouncementById(correlationId: string, announcementId: string, callback: any): void;
            createAnnouncement(correlationId: string, announcement: any, callback: any): void;
            updateAnnouncement(correlationId: string, announcementId: string, announcement: any, callback: any): void;
            deleteAnnouncement(correlationId: string, announcementId: string, callback: any): void;
        }

        export class AnnouncementsSenecaClient extends SenecaClient implements IAnnouncementsClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getAnnouncements(correlationId: string, filter: any, paging: any, callback: any): void;
            getRandomAnnouncement(correlationId: string, filter: any, callback: any): void;
            getAnnouncementById(correlationId: string, announcementId: string, callback: any): void;
            createAnnouncement(correlationId: string, announcement: any, callback: any): void;
            updateAnnouncement(correlationId: string, announcementId: string, announcement: any, callback: any): void;
            deleteAnnouncement(correlationId: string, announcementId: string, callback: any): void;
        }
    }
}
