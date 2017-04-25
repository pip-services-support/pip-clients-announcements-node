# Client API (version 1) <br/> Announcements Microservices Client SDK for Node.js

Node.js client API for Announcements microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [AttachmentV1 class](#class1)
* [PartyRefereneceV1 class](#class2)
* [LocationV1 class](#class3)
* [AnnouncementV1 class](#class4)
* [IAnnouncementsClientV1 interface](#interface)
    - [getAnnouncements()](#operation1)
    - [getRandomAnnouncement()](#operation2)
    - [getAnnouncementById()](#operation3)
    - [createAnnouncement()](#operation4)
    - [updateAnnouncement()](#operation5)
    - [deleteAnnouncementById()](#operation6)
* [AnnouncementsHttpClientV1 class](#client_http)
* [AnnouncementsSenecaClientV1 class](#client_seneca)
* [AnnouncementsLambdaClientV1 class](#client_lambda)
* [AnnouncementsDirectClientV1 class](#client_direct)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-announcements-node": "^1.0.*",
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

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-announcements-node');

// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};

// Create the client instance
var client = sdk.AnnouncementsHttpClientV1(config);

// Open client connection to the microservice
client.open(null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
    // Create a new announcement
    client.createAnnouncement(
        null,
        { 
            category: 'maintenance',
            title: { en: 'Maintenance on Jan 01' },
            content: { en: 'Our servers will be shutdown for maintenance on Jan 01' }
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
                null,
                {},
                function(err, announcement) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Random announcement is');
                    console.log(announcement);
                    
                    // Close connection
                    client.close(null); 
                }
            );
        }
    );
});
```

## Data types

### <a name="class1"></a> AttachmentV1 class

Contains reference to a document attachment

**Properties:**
- id: string - unique feedback id
- name: string - document (file) name

### <a name="class2"></a> PartyReferenceV1 class

Contains reference to sending or replying party

**Properties:**
- id: string - unique feedback id
- name: string - party name
- email: string - (optional) party email address (optional)

### <a name="class3"></a> LocationV1 class

Contains location on a map

**Properties:**
- name: string - Logical location name or address
- pos: any - Position coordinates in GeoJSON

### <a name="class4"></a> AnnouncementV1 class

Represents a system announcement. 

**Properties:**
- id: string - unique announcement id
- category: string - announcement category, i.e. 'maintenance', 'product update', etc.
- app: string - (optional) application name
- creator: PartyReferenceV1 - party who created the announcement
- create_time: Date - date and time when announcement was created
- title: MultiString - (optional) announcement title in multiple languages
- content: MultiString - announcement textual content in multiple languages
- loc: LocationV1 - (optional) location associated with this announcement
- start_time: Date - (optional) start of a time interval associated with this announcement
- end_time: Date - (optional) end of a time interval associated with this announcement
- pic_ids: [string] - (optional) array of picture block ids in storage attached to this announcement
- docs: [AttachmentV1] - (optional) array of attached documents
- tags: [string] - (optional) explicit tags with annoucement topic for searching
- all_tags: [string] - (readonly) normalized array of explicit and hash tags used by search
- status: string - editing status: 'new', 'writing', 'translating', 'completed' (default: 'new')
- importance: int - (optional) importance: 0 - low, 1000 - high (default: 0)
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

## <a name="interface"></a> IAnnouncementsClientV1 interface

If you are using Typescript, you can use IAnnouncementsClientV1 as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about IAnnouncementsClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface IAnnouncementsClientV1 {
    getAnnouncements(correlationId, filter, paging, callback);
    getRandomAnnouncement(correlationId, filter, callback);
    getAnnouncementById(correlationId, announcementId, callback);
    createAnnouncement(correlationId, announcement, user, callback);
    updateAnnouncement(correlationId, announcementId, update, user, callback);
    deleteAnnouncementById(correlationId, announcementId, callback);
}
```

### <a name="operation1"></a> getAnnouncements(correlationId, filter, paging, callback)

Retrieves a list of announcements by specified criteria

**Params properties:** 
- correlationId: string - id that uniquely identifies transaction
- filter: object - filter parameters
  - category: string - (optional) announcement category
  - app: string - (optional) application name
  - status: string - (optional) editing status
  - from\_create\_time: Date - (optional) start of announcement created interval
  - to\_create\_time: Date - (optional) end of announcement created interval
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name
- paging: object - paging parameters
  - paging: bool - (optional) true to enable paging and return total count
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result
- callback: (err, page) => void - callback function
  - err: Error - occured error or null for success
  - page: DataPage<AnnouncementV1> - retrieved page of Announcement objects

### <a name="operation3"></a> getAnnouncementById(correlationId, announcementId, callback)

Retrieves announcement by its unique id. 

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- announcementId: string - unique announcement id
- callback: (err, announcement) => void - callback function
  - err: Error - occured error or null for success
  - announcement: AnnouncementV1 - retrieved Announcement object

### <a name="operation4"></a> createAnnouncement(correlationId, announcement, callback)

Creates an announcement

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- announcement: AnnouncementV1 - a announcement to be created
- callback: (err, announcement) => void - callback function
  - err: Error - occured error or null for success
  - announcement: AnnouncementV1 - created Announcement object
 
### <a name="operation5"></a> updateAnnouncement(correlationId, announcement, callback)

Updates an announcement

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- announcement: AnnouncementV1 - a announcement to be updated
- callback: (err, announcement) => void - callback function
  - err: Error - occured error or null for success
  - announcement: AnnouncementV1 - updated Announcement object
 
### <a name="operation6"></a> deleteAnnouncementById(correlationId, announcementId, callback)

Deletes system announcement specified by its unique id.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- announcementId: string - unique announcement id
- callback: (err) => void - callback function
  - err: Error - occured error or null for success
 
## <a name="client_http"></a> AnnouncementsHttpClientV1 class

AnnouncementsHttpClientV1 is a client that implements HTTP protocol

```javascript
class AnnouncementsHttpClientV1 extends CommandableHttpClient implements IAnnouncementsClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getAnnouncements(correlationId, filter, paging, callback);
    getRandomAnnouncement(correlationId, filter, callback);
    getAnnouncementById(correlationId, announcementId, callback);
    createAnnouncement(fcorrelationId, eedback, user, callback);
    updateAnnouncement(correlationId, announcementId, update, user, callback);
    deleteAnnouncementById(correlationId, announcementId, callback);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> AnnouncementsSenecaClientV1 class

AnnouncementsSenecaClientV1 is a client that implements Seneca protocol

```javascript
class AnnouncementsSenecaClientV1 extends CommandableSenecaClient implements IAnnouncementsClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getAnnouncements(correlationId, filter, paging, callback);
    getRandomAnnouncement(correlationId, filter, callback);
    getAnnouncementById(correlationId, announcementId, callback);
    createAnnouncement(fcorrelationId, eedback, user, callback);
    updateAnnouncement(correlationId, announcementId, update, user, callback);
    deleteAnnouncementById(correlationId, announcementId, callback);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_seneca"></a> AnnouncementsLambdaClientV1 class

AnnouncementsLambdaClientV1 is a client that connects to AWS lambda function

```javascript
class AnnouncementsLambdaClientV1 extends CommandableLambdaClient implements IAnnouncementsClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getAnnouncements(correlationId, filter, paging, callback);
    getRandomAnnouncement(correlationId, filter, callback);
    getAnnouncementById(correlationId, announcementId, callback);
    createAnnouncement(fcorrelationId, eedback, user, callback);
    updateAnnouncement(correlationId, announcementId, update, user, callback);
    deleteAnnouncementById(correlationId, announcementId, callback);
}
```

**Constructor config properties:** 
- connection: object - AWS lambda connection options. 
  - type: string - 'aws'
  - arn: string - Lambda function arn
- credential: object - AWS lambda credential options
  - access_id: string - Amazon access id
  - access_key: string - Amazon secret access key

## <a name="client_seneca"></a> AnnouncementsDirectClientV1 class

AnnouncementsDirectClientV1 is a client that calls controller directly from the same container.
It can be used in monolythic deployments when multiple microservices run in the same process.

```javascript
class AnnouncementsDirectClientV1 extends DirectClient implements IAnnouncementsClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getAnnouncements(correlationId, filter, paging, callback);
    getRandomAnnouncement(correlationId, filter, callback);
    getAnnouncementById(correlationId, announcementId, callback);
    createAnnouncement(fcorrelationId, eedback, user, callback);
    updateAnnouncement(correlationId, announcementId, update, user, callback);
    deleteAnnouncementById(correlationId, announcementId, callback);
}
```
