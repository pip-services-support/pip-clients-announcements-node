import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams} from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';

import { AnnouncementV1 } from './AnnouncementV1';
import { PartyReferenceV1 } from './PartyReferenceV1';
import { IAnnouncementsClientV1 } from './IAnnouncementsClientV1';
//import { IAnnouncementsController } from 'pip-services-announcements-node';

export class AnnouncementsDirectClientV1 extends DirectClient<any> implements IAnnouncementsClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-announcements", "controller", "*", "*", "*"))

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<AnnouncementV1>) => void): void {
        let timing = this.instrument(correlationId, 'announcements.get_announcements');
        this._controller.getAnnouncements(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public getRandomAnnouncement(correlationId: string, filter: FilterParams,
        callback: (err: any, announcement: AnnouncementV1) => void): void {
        let timing = this.instrument(correlationId, 'announcements.get_random_announcement');
        this._controller.getRandomAnnouncement(correlationId, filter, (err, announcement) => {
            timing.endTiming();
            callback(err, announcement);
        });
    }

    public getAnnouncementById(correlationId: string, announcementId: string,
        callback: (err: any, announcement: AnnouncementV1) => void): void {
        let timing = this.instrument(correlationId, 'announcements.get_announcement_by_id');
        this._controller.getAnnouncementById(correlationId, announcementId, (err, announcement) => {
            timing.endTiming();
            callback(err, announcement);
        });
    }

    public createAnnouncement(correlationId: string, announcement: AnnouncementV1,
        callback: (err: any, announcement: AnnouncementV1) => void): void {
        let timing = this.instrument(correlationId, 'announcements.create_announcement');
        this._controller.createAnnouncement(correlationId, announcement, (err, announcement) => {
            timing.endTiming();
            callback(err, announcement);
        });
    }

    public updateAnnouncement(correlationId: string, announcement: AnnouncementV1,
        callback: (err: any, announcement: AnnouncementV1) => void): void {
        let timing = this.instrument(correlationId, 'announcements.update_announcement');
        this._controller.updateAnnouncement(correlationId, announcement, (err, announcement) => {
            timing.endTiming();
            callback(err, announcement);
        });
    }

    public deleteAnnouncementById(correlationId: string, announcementId: string,
        callback: (err: any, announcement: AnnouncementV1) => void): void {
        let timing = this.instrument(correlationId, 'announcements.delete_announcement_by_id');
        this._controller.deleteAnnouncementById(correlationId, announcementId, (err, announcement) => {
            timing.endTiming();
            callback(err, announcement);
        });
    }

}