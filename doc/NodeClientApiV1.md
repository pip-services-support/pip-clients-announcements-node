# Client API (version 1) <br/> Announcements Microservices Client SDK for Node.js

Node.js client API for Announcements microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [MultiString class](#class1)
* [Announcement class](#class2)
* [AnnouncementPage class](#class3)
* [IAnnouncementsClient interface](#interface)
    - [init()](#operation1)
    - [open()](#operation2)
    - [close()](#operation3)
    - [getAnnouncements()](#operation4)
    - [getRandomAnnouncement()](#operation5)
    - [getAnnouncementById()](#operation6)
    - [createAnnouncement()](#operation7)
    - [updateAnnouncement()](#operation8)
    - [deleteAnnouncement()](#operation9)
* [AnnouncementsRestClient class](#client_rest)
* [AnnouncementsSenecaClient class](#client_seneca)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-announces-node": "git+ssh://git@github.com:pip-services/pip-clients-announces-node.git",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

If you are using Typescript, add the following type definition where compiler can find it
```javascript
/// <reference path="../node_modules/pip-clients-announces-node/module.d.ts" />
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-announces-node').Version1;

// Client configuration
var config = {
    transport: {
        type: 'http',
        host: 'localhost', 
        port: 8011
    }
};

// Create the client instance
var client = sdk.AnnouncementsRestClient(config);

// Open client connection to the microservice
client.open(function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
    // Create a new announcement
    client.createAnnouncement(
        { 
            category: 'maintenance',
            title: 'Maintenance on Jan 01',
            content: 'Our servers will be shutdown for maintenance on Jan 01'
        },
        function (err, announcement) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Created announcement is');
            console.log(announcement);
            
            // Get a random announcement
            client.getRandomAnnouncement(
                {},
                function(err, announcement) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Random announcement is');
                    console.log(announcement);
                    
                    // Close connection
                    client.close(); 
                }
            );
        }
    );
});
```

## Data types

### <a name="class1"></a> MultiString class

String that contains versions in multiple languages

**Properties:**
- en: string - English version of the string
- sp: string - Spanish version of the string
- de: string - German version of the string
- fr: string - Franch version of the string
- pt: string - Portuguese version of the string
- ru: string - Russian version of the string
- .. - other languages can be added here

### <a name="class2"></a> Announcement class

Represents a system announcement. 

**Properties:**
- id: string - unique announcement id
- category: string - announcement category, i.e. 'maintenance', 'product update', etc.
- app: string - (optional) application name
- creator: Reference - user or party who created the announcement
    - id: string - unique user or party id
    - name: string - creator/author name
- created: Date - date and time when announcement was created
- title: MultiString - (optional) announcement title in multiple languages
- content: MultiString - announcement textual content in multiple languages
- loc: Location - (optional) location associated with this announcement
    - name: string - (optional) location name or address
    - pos: Object - (optional) location position in GeoJSON format
- start: Date - (optional) start of a time interval associated with this announcement
- end: Date - (optional) end of a time interval associated with this announcement
- pic_ids: string[] - (optional) array of picture block ids in storage attached to this announcement
- docs: Reference[] - (optional) array of attached documents
  - id: string - block id in storage attached to this announcement
  - name: string - attached document/file name
- tags: string[] - (optional) explicit tags with annoucement topic for searching
- all_tags: string[] - (readonly) normalized array of explicit and hash tags used by search
- status: string - editing status: 'new', 'writing', 'translating', 'completed' (default: 'new')
- importance: int - (optional) importance: 0 - low, 1000 - high (default: 0)
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

### <a name="class3"></a> AnnouncementPage class

Represents a paged result with subset of requested Announcement objects

**Properties:**
- data: Announcement[] - array of retrieved Announcement page
- count: int - total number of objects in retrieved resultset

## <a name="interface"></a> IAnnouncementsClient interface

If you are using Typescript, you can use IAnnouncementsClient as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about IAnnouncementsClient interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface IAnnouncementsClient {
    init(refs, callback);
    open(callback);
    close(callback);
    getAnnouncements(filter, paging, callback);
    getRandomAnnouncement(filter, callback);
    getAnnouncementById(announcementId, callback);
    createAnnouncement(announcement, callback);
    updateAnnouncement(announcementId, announcement, callback);
    deleteAnnouncement(announcementId, callback);
}
```

### <a name="operation1"></a> init(refs)

Initializes client references. This method is optional. It is used to set references 
to logger or performance counters.

**Arguments:**
- refs: References - references to other components 
  - log: ILog - reference to logger
  - countes: ICounters - reference to performance counters
- callback: (err) => void - callback function
  - err - Error or null is no error occured

### <a name="operation2"></a> open(callback)

Opens connection to the microservice

**Arguments:**
- callback: (err) => void - callback function
  - err - Error or null is no error occured

### <a name="operation3"></a> close(callback)

Closes connection to the microservice

**Arguments:**
- callback: (err) => void - callback function
  - err - Error or null is no error occured

### <a name="operation4"></a> getAnnouncements(filter, paging, callback)

Retrieves a list of announcements by specified criteria

**Params properties:** 
- filter: object - filter parameters
  - category: string - (optional) announcement category
  - app: string - (optional) application name
  - status: string - (optional) editing status
  - from: Date - (optional) start of announcement created interval
  - to: Date - (optional) end of announcement created interval
  - tags: string[] - search tags
  - search: string - string for full text search in title, content and creator name
- paging: object - paging parameters
  - paging: bool - (optional) true to enable paging and return total count
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result
- callback: (err, page) => void - callback function
  - err: Error - occured error or null for success
  - page: AnnouncementPage - retrieved Announcement objects in paged format

### <a name="operation5"></a> getRandomAnnouncement(filter, callback)

Retrieves a random announcement from filtered resultset

**Arguments:** 
- filter: object - filter parameters
  - category: string - (optional) announcement category
  - app: string - (optional) application name
  - status: string - (optional) editing status
  - from: Date - (optional) start of announcement created interval (default: 1 week from current time)
  - to: Date - (optional) end of announcement created interval
  - tags: string[] - search tags
  - search: string - string for full text search in title, content and creator name
- callback: (err, announcement) => void - callback function
  - err: Error - occured error or null for success
  - announcement: Announcement - random Announcement or null if nothing was found

### <a name="operation6"></a> getAnnouncementById(announcementId, callback)

Retrieves announcement by its unique id. 

**Arguments:** 
- announcementId: string - unique announcement id
- callback: (err, announcement) => void - callback function
  - err: Error - occured error or null for success
  - announcement: Announcement - retrieved Announcement object

### <a name="operation7"></a> createAnnouncement(announcement, callback)

Creates a new system announcement.

**Arguments:** 
- announcement: Announcement - a new annoucement to be created
- callback: (err, announcement) => void - callback function
  - err: Error - occured error or null for success
  - announcement: Announcement - created Announcement object
 
### <a name="operation8"></a> updateAnnouncement(announcementId, announcement, callback)

Updated announcement specified by its unique id.

**Arguments:** 
- announcementId: string - unique announcement id
- announcement: Announcement - new announcement values (partial updates are supported)
- callback: (err, announcement) => void - callback function
  - err: Error - occured error or null for success
  - announcement: Announcement - updated Announcement object

### <a name="operation9"></a> deleteAnnouncement(announcementId, callback)

Deletes system announcement specified by its unique id.

**Arguments:** 
- announcementId: string - unique announcement id
- callback: (err) => void - callback function
  - err: Error - occured error or null for success
 
## <a name="client_rest"></a> AnnouncementsRestClient class

AnnouncementsRestClient is a client that implements HTTP/REST protocol

```javascript
class AnnouncementsRestClient extends RestClient implements IAnnouncementsClient {
    constructor(config: any);
    init(refs, callback);
    open(callback);
    close(callback);
    getAnnouncements(filter, paging, callback);
    getRandomAnnouncement(filter, callback);
    getAnnouncementById(announcementId, callback);
    createAnnouncement(announcement, callback);
    updateAnnouncement(announcementId, announcement, callback);
    deleteAnnouncement(announcementId, callback);
}
```

**Constructor config properties:** 
- transport: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> AnnouncementsSenecaClient class

AnnouncementsSenecaClient is a client that implements Seneca protocol

```javascript
class AnnouncementsSenecaClient extends SenecaClient implements IAnnouncementsClient {
    constructor(config: any);        
    init(refs, callback);
    open(callback);
    close(callback);
    getAnnouncements(filter, paging, callback);
    getRandomAnnouncement(filter, callback);
    getAnnouncementById(announcementId, callback);
    createAnnouncement(announcement, callback);
    updateAnnouncement(announcementId, announcement, callback);
    deleteAnnouncement(announcementId, callback);
}
```

**Constructor config properties:** 
- transport: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number
