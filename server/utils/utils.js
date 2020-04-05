const CreateMessage = ( name, message ) => {
    let date = new Date();
    return { name, message , date: `${date.getHours()}:${date.getMinutes()}` }
}

const CreateUserMessage = ( id, username, userImage, message ) => {
    let date = new Date();
    return { id, username, userImage, message , date: `${date.getHours()}:${date.getMinutes()}` }
}


module.exports = {CreateMessage,CreateUserMessage}