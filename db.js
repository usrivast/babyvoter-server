/**
 * Created by nru278 on 9/13/16.
 */
module.exports = {
    // 'url' : 'mongodb://localhost/babyvoter',
    'url' : process.env.MONGODB_URI || 'mongodb://localhost:27017/babyvoter',
    'token_secret': 'supersecrettoken',
    'FACEBOOK_ID': 'yourfbid',
    'FACEBOOK_SECRET': 'secret'
}