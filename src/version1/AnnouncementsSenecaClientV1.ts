import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableSenecaClient } from 'pip-services-net-node';

import { AnnouncementV1 } from './AnnouncementV1';
import { PartyReferenceV1 } from './PartyReferenceV1';
import { IAnnouncementsClientV1 } from './IAnnouncementsClientV1';

export class AnnouncementsSenecaClientV1 extends CommandableSenecaClient implements IAnnouncementsClientV1 {

    constructor(config?: any) {
        super('announcements');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
       
    public getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<AnnouncementV1>) => void): void {
        this.callCommand(
            'get_announcements',
            correlationId,
            {
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }

    public getRandomAnnouncement(correlationId: string, filter: FilterParams,
        callback: (err: any, announcement: AnnouncementV1) => void): void {
        this.callCommand(
            'get_random_announcement',
            correlationId,
            {
                filter: filter
            }, 
            callback
        );
    }

    public getAnnouncementById(correlationId: string, announcementId: string,
        callback: (err: any, announcement: AnnouncementV1) => void): void {
        this.callCommand(
            'get_announcement_by_id',
            correlationId,
            {
                announcement_id: announcementId
            }, 
            callback
        );
    }

    public createAnnouncement(correlationId: string, announcement: AnnouncementV1,
        callback: (err: any, announcement: AnnouncementV1) => void): void {
        this.callCommand(
            'create_announcement',
            correlationId,
            {
                announcement: announcement,
            }, 
            callback
        );
    }

    public updateAnnouncement(correlationId: string, announcement: AnnouncementV1,
        callback: (err: any, announcement: AnnouncementV1) => void): void {
        this.callCommand(
            'update_announcement',
            correlationId,
            {
                announcement: announcement,
            }, 
            callback
        );
    }

    public deleteAnnouncementById(correlationId: string, announcementId: string,
        callback: (err: any, announcement: AnnouncementV1) => void): void {
        let timing = this.instrument(correlationId, 'announcements.delete_announcement_by_id');
        this.callCommand(
            'delete_announcement_by_id',
            correlationId,
            {
                announcement_id: announcementId
            }, 
            callback
        );
    }

}
