import { IClient } from 'pip-services-runtime-node';

export interface IAnnouncementsClient extends IClient {
    getAnnouncements(correlationId: string, filter: any, paging: any, callback: any): void;
    getRandomAnnouncement(correlationId: string, filter: any, callback: any): void;
    getAnnouncementById(correlationId: string, announcementId: string, callback: any): void;
    createAnnouncement(correlationId: string, announcement: any, callback: any): void;
    updateAnnouncement(correlationId: string, announcementId: string, announcement: any, callback: any): void;
    deleteAnnouncement(correlationId: string, announcementId: string, callback: any): void;
}
