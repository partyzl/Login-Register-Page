const db = require('../dbConfig/init')

class User {
    constructor(data){
        this.username = data.username;
        this.email = data.email;
        this.passwordDigest = data.password_digest;
    }

    static get all() {
        return new Promise(async (res, rej) => {
            try {
                console.log("hello");
                let result = await db.query(`SELECT * FROM users;`);
                let users = result.rows.map((r) => new User(r));
                res(users)
            } catch (error) {
                rej(`Error retrieving users: ${error}`)
            }
        })
    }

    static create(userData) {
        return new Promise(async (res, rej) => {
            try {
                const {username, email, password} = userData;
                let result = await db.query(`INSERT INTO users (username, email, password_digest)
                                            VALUES ($1, $2, $3) RETURNING *;`,
                                            [username, email, password]);
                let user = new User(result.rows[0]);
                res(user)
            } catch (error) {
                rej(`Error creating new user: $(error)`)
            }
        })
    }

    static findByUsername(username){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT * FROM users WHERE username = $1;`,
                                            [username]);
                let user = new User(result.rows[0]);
                res(user);
            } catch (error) {
                rej(`Error retrieving user: ${error}`);
            }
        })
    }

    destroy() {
        return new Promise(async (res, rej) => {
            try {
                const result = await db.query(`DELETE FROM users WHERE username = $1 RETURNING username;`, [this.username]);
                res(`User ${result.username} was deleted`);
            } catch (error) {
                rej(`User could not be deleted: ${error}`)
                
            }
        })
    }
}

module.exports = User;