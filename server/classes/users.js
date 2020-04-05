class Users {

    constructor(){
        this.userList = [];
    }

    addUser(id, name, image, room) {
        let user = {id, image, name, room};
        this.userList.push(user);
        return this.userList;
    }

    getUserById(id){
        return this.userList.filter(x => x.id == id)[0];
    }

    getUsersByRoom(room){
        return this.userList.filter(x => x.room == room);
    }

    getUsers(){
        return this.userList;
    }

    deleteUser(id){
        let userdeleted = this.getUserById(id);
        this.userList = this.userList.filter(x => x.id != id);
        return userdeleted;
    }
}

module.exports = { Users }