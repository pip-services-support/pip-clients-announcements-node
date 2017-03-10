let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { RestClient } from 'pip-services-runtime-node';

import { IAnnouncementsClient } from './IAnnouncementsClient';

export class AnnouncementsRestClient extends RestClient implements IAnnouncementsClient {       
	/**
	 * Unique descriptor for the AnnouncementsRestClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-announces", "rest", "1.0"
	);
    
    constructor(config?: any) {
        super(AnnouncementsRestClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }
        
    public getAnnouncements(correlationId: string, filter: any, paging: any, callback) {
        callback = this.instrument(correlationId, 'announces.get_announcements', callback);
        
        let params = {};
        this.addCorrelationId(params, correlationId);
        this.addFilterParams(params, filter);
        this.addPagingParams(params, paging);

        this.call('get', 
            '/announcements', 
            params, 
            callback
        );
    }

    public getRandomAnnouncement(correlationId: string, filter: any, callback) {
        callback = this.instrument(correlationId, 'announces.get_random_announcement', callback);

        let params = {};
        this.addCorrelationId(params, correlationId);
        this.addFilterParams(params, filter);
        
        this.call('get', 
            '/announcements/random',
            params, 
            callback
        );        
    }

    public getAnnouncementById(correlationId: string, announcementId: string, callback) {
        callback = this.instrument(correlationId, 'announces.get_announcement_by_id', callback);
        
        this.call('get', 
            '/announcements/' + announcementId,
            {
                correlation_id: correlationId
            }, 
            callback
        );        
    }

    public createAnnouncement(correlationId: string, announcement: any, callback) {
        callback = this.instrument(correlationId, 'announces.create_announcement', callback);
        
        this.call('post', 
            '/announcements',
            {
                correlation_id: correlationId
            }, 
            announcement, 
            callback
        );
    }

    public updateAnnouncement(correlationId: string, announcementId: string, announcement: any, callback) {
        callback = this.instrument(correlationId, 'announces.update_announcement', callback);
        
        this.call('put', 
            '/announcements/' + announcementId, 
            {
                correlation_id: correlationId
            }, 
            announcement, 
            callback
        );
    }

    public deleteAnnouncement(correlationId: string, announcementId: string, callback) {
        callback = this.instrument(correlationId, 'announces.delete_announcement', callback);

        this.call('delete', 
            '/announcements/' + announcementId, 
            {
                correlation_id: correlationId
            }, 
            callback
        );
    }
    
}
