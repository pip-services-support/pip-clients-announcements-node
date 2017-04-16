"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AnnouncementV1 {
    constructor(id, category, app, createer, title, content) {
        this.id = id;
        this.category = category;
        this.app = app;
        this.createer = createer;
        this.title = title;
        this.content = content;
        this.pic_ids = [];
        this.docs = [];
        this.sent_time = new Date();
    }
}
exports.AnnouncementV1 = AnnouncementV1;
//# sourceMappingURL=AnnouncementV1.js.map