import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableSenecaClient } from 'pip-services-seneca-node';
import { AnnouncementV1 } from './AnnouncementV1';
import { IAnnouncementsClientV1 } from './IAnnouncementsClientV1';
export declare class AnnouncementsSenecaClientV1 extends CommandableSenecaClient implements IAnnouncementsClientV1 {
    constructor(config?: any);
    getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<AnnouncementV1>) => void): void;
    getRandomAnnouncement(correlationId: string, filter: FilterParams, callback: (err: any, announcement: AnnouncementV1) => void): void;
    getAnnouncementById(correlationId: string, announcementId: string, callback: (err: any, announcement: AnnouncementV1) => void): void;
    createAnnouncement(correlationId: string, announcement: AnnouncementV1, callback: (err: any, announcement: AnnouncementV1) => void): void;
    updateAnnouncement(correlationId: string, announcement: AnnouncementV1, callback: (err: any, announcement: AnnouncementV1) => void): void;
    deleteAnnouncementById(correlationId: string, announcementId: string, callback: (err: any, announcement: AnnouncementV1) => void): void;
}
