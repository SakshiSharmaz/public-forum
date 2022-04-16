import Dexie from "dexie";

class ForumDB extends Dexie {
    constructor() {
        super("ForumDB");

        this.version(1).stores({
            users: "++id, username, password",
            topics: "++id, author, title, description, createdOn",
            posts: "++id, topicId, postBy, postedOn, body"
        });
    }
}

export const db = new ForumDB();