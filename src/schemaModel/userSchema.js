const userSchema = {
    method: '',
    email: '',
    password: '',
    googleId: '',
    first_name: '',
    last_name: '',
    gender: '',
    user_name: '',
    avatar: '',
    bio: '',
    location: '',
    hobbies: [],
    history_search: [
        //{
        //     date: '',
        //     query:
        // }
    ],
    saved_photo: [
        //     {
        //     decsription: 'abc',
        //     src: 'abc.jpg'
        // }
    ],
    following: [],
    followers: []
}
module.exports = userSchema
