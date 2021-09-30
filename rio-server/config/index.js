/**
 * Created by kylejohnson on 02/10/2016.
 */
module.exports = {
    matrix: {
        width: 60,
        height: 34
     },
    use8bitColors: true,
    text_speed_factor: 4, //text speed is (-2*matrix.width+150)/text_speed_factor. use factor to adjust
    sendToConsole: true,
    sendToWebsockets: true,
    sendToPi: false,
    slackToken: '',
    slackChannelName: '',
    twitter: {
        consumer_key:         '',
        consumer_secret:      '',
        access_token:         '',
        access_token_secret:  '',
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    },
    queueing: true,
    imageInputDisplayTime: 5000, // Only relevant when queueing is enabled,
    watson: false
};
