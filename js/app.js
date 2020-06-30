if ("serviceWorker" in navigator) {
    window.addEventListener("load", function(){
        navigator.serviceWorker
        .register("/service-worker.js")
        .then(function(){
            console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function(){
            console.log("Pendaftaran ServiceWorker gagal");
        });
    });
}else{
    console.log("ServiceWorker belum didukung browser ini");
}

//REQ API
document.addEventListener("DOMContentLoaded", function(){
    klasemen();
    Scorers();

    function showAlltim() {
    getAllTim().then(teams => {
    let listTeams = "";
    teams.forEach(team => {

    });
    console.log(teams);    
    })
    }
    
});


//cek fitur notification API
if ("Notification" in window) {
    requestPermission();
} else {
    console.error("Browser tidak mendukung notifikasi");
}


// Ijin menggunakan notification API
function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function(result) {
        if (result === "denied") {
            console.log("Fitur notifikasi tidak diijinkan");
            return;
        } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin");
            return;
        }

        if (('PushManager' in window)) {
            navigator.serviceWorker.getRegistration().then(function(registration) {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array("BOQaAuZKT-nHvHWzZjsBU80qzr19D_mr2ZkNece3ymPLT-PbW0YjBsa8WbGM7TPD5T0vOLotLoTXORm6C25a-6Y")
                }).then(function(subscribe) {
                    console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                    console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
                    console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));
                }).catch(function(e){
                    console.error('Tidak dapat melakukan subscribe ', e.message);
                });
            });
        }
    });
    }
};


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}