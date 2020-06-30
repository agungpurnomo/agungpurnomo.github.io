const dbPromised = idb.open("premier-league", 1, upgradeDb=>{
    const teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id",
    });
    teamsObjectStore.createIndex("teams","teams", {unique: false});
});

const saveForTeam = async (team)=>{
    try {
        const db = await dbPromised;
        const tx = db.transaction("teams", "readwrite");
        const store = tx.objectStore("teams");   
            store.add(team);
            M.toast({
                html : `berhasil disimpan`
            });
            return tx.complete;
    } catch(err) {
        console.log(err);
    }
};

const getAllTeam = () => {
    return new Promise((resolve, reject) => {
        dbPromised.then((db) => {
            const tx = db.transaction("teams", "readonly");
            const store = tx.objectStore("teams");
            return store.getAll();
        }).then(function(teams) {
            resolve(teams);
          });
    });
};

const getById = (id)=> {
    return new Promise((resolve, reject) => {
        dbPromised.then((db)=>{
            const tx = db.transaction("teams","readonly");
            const store = tx.objectStore("teams");
            return store.get(id);
        })
        .then((team)=>{
            resolve(team);
        });
    });
}

const cekTeam = async (team,id) => {
    const db = await dbPromised;
    const tx = db.transaction("teams", "readwrite");
    const store = tx.objectStore("teams");
    const cekId = await store.get(id);
    if (cekId === undefined) {
        saveForTeam(team);
    } else {
        M.toast({
            html: `Gagal Simpan,Team sudah ada!`,
        });
    }
};

const deleteTeam = (id)=> {
    dbPromised
    .then((db) => {
        var tx = db.transaction("teams","readwrite");
        var store = tx.objectStore("teams");
        store.delete(id);
        return tx.complete;
    })
    .then(()=> {
        M.toast({
            html:`Team berhasil dihapus`,
        });
        window.location.href = window.location.href;
        getTeamSave();
    });
}