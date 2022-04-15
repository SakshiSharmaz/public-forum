import Dexie from "dexie";

class ForumDB extends Dexie {
    constructor() {
        super("ForumDB");

        this.version(1).stores({
            users: "++id, username, password"
        });
    }
}

export const db = new ForumDB();