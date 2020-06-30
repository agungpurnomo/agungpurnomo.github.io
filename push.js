var webPush = require('web-push');

const vapidkeys = {
    "publicKey": "BOQaAuZKT-nHvHWzZjsBU80qzr19D_mr2ZkNece3ymPLT-PbW0YjBsa8WbGM7TPD5T0vOLotLoTXORm6C25a-6Y",
    "PrivateKey": "VDzE6UYVc8lcp22l4Stq2RUN8K_pFRvEEqUURrzYRiQ"
};

webPush.setVapidDetails(
    'mailto:agung.laravel@gmail.com',
    vapidkeys.publicKey,
    vapidkeys.PrivateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eT_Az0JRcmA:APA91bGbJZKIVuZhbT-wURsrfYC97OmBJ2ZOllSc953XMxnTquqkSfRuWx0HyeJdZdUdqFZEApllinCKvjJUAJ07rRgXO-RMLDnFh1gHOb9wGuhy7MxkZHP5vO6xuWQgorH1o1vpTYwF",
    "keys": {
        "p256dh": "BFDpPf0TNh5+zY46q+JDP5S4tRltCIIBtTbnhjY/qoLWwdvp/cy/dvX3UZtEwtSrw9eKaiFVRdVLPPYQJMZnD8s=",
        "auth": "FgNnJcQA9nSEfIUkBgus0w=="
    }
};

var payload = 'Selamat! Aplikasi anda sudah dapat menerima push notifikasi';

var options = {
    gcmAPIKey: '640520303634',
    TTL:60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);