import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableSenecaClient } from 'pip-services-net-node';
import { AnnouncementV1 } from './AnnouncementV1';
import { PartyReferenceV1 } from './PartyReferenceV1';
import { IAnnouncementsClientV1 } from './IAnnouncementsClientV1';
export declare class AnnouncementsSenecaClientV1 extends CommandableSenecaClient implements IAnnouncementsClientV1 {
    constructor(config?: any);
    getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<AnnouncementV1>) => void): void;
    getAnnouncementById(correlationId: string, announcementId: string, callback: (err: any, announcement: AnnouncementV1) => void): void;
    createAnnouncement(correlationId: string, announcement: AnnouncementV1, user: PartyReferenceV1, callback: (err: any, announcement: AnnouncementV1) => void): void;
    updateAnnouncement(correlationId: string, announcementId: string, update: string, user: PartyReferenceV1, callback: (err: any, announcement: AnnouncementV1) => void): void;
    deleteAnnouncementById(correlationId: string, announcementId: string, callback: (err: any, announcement: AnnouncementV1) => void): void;
}
