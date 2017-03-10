let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { SenecaClient } from 'pip-services-runtime-node';

import { IAnnouncementsClient } from './IAnnouncementsClient';

export class AnnouncementsSenecaClient extends SenecaClient implements IAnnouncementsClient {       
	/**
	 * Unique descriptor for the AnnouncementsSenecaClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-announces", "seneca", "1.0"
	);
    
    constructor(config?: any) {
        super(AnnouncementsSenecaClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }
        
    public getAnnouncements(correlationId: string, filter: any, paging: any, callback) {
        callback = this.instrument(correlationId, 'announces.get_announcements', callback);
        this.call(
            'announcements', 'get_announcements',
            {
                correlation_id: correlationId,
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }

    public getRandomAnnouncement(correlationId: string, filter: any, callback) {
        callback = this.instrument(correlationId, 'announces.get_random_announcement', callback);
        this.call(
            'announcements', 'get_random_announcement',
            {
                correlation_id: correlationId,
                filter: filter
            }, 
            callback
        );        
    }

    public getAnnouncementById(correlationId: string, announcementId: string, callback) {
        callback = this.instrument(correlationId, 'announces.get_announcement_by_id', callback);
        this.call(
            'announcements', 'get_announcement_by_id',
            {
                correlation_id: correlationId,
                announcement_id: announcementId
            },
            callback
        );        
    }

    public createAnnouncement(correlationId: string, announcement: any, callback) {
        callback = this.instrument(correlationId, 'announces.create_announcement', callback);
        this.call(
            'announcements', 'create_announcement',
            {
                correlation_id: correlationId,
                announcement: announcement
            }, 
            callback
        );
    }

    public updateAnnouncement(correlationId: string, announcementId: string, announcement: any, callback) {
        callback = this.instrument(correlationId, 'announces.update_announcement', callback);
        this.call(
            'announcements', 'update_announcement',
            {
                correlation_id: correlationId,
                announcement_id: announcementId,
                announcement: announcement
            }, 
            callback
        );
    }

    public deleteAnnouncement(correlationId: string, announcementId: string, callback) {
        callback = this.instrument(correlationId, 'announces.delete_announcement', callback);
        this.call(
            'announcements', 'delete_announcement',
            {
                correlation_id: correlationId,
                announcement_id: announcementId
            }, 
            callback
        );
    }
    
}
