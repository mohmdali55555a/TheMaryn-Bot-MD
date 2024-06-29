> *`in 'index.js'`*
// GET DATABASE >>
async function fetchDataAndSave() {
    try {
        try {
            fs.unlinkSync('database.json');
            console.log('database.json file deleted successfully.');
        } catch (err) {
            console.error('Error deleting database.json file:', err);
        }

        const serviceAccount = JSON.parse(fs.readFileSync('./firebase-key.json', 'utf8'));
        const id = serviceAccount.project_id
        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount),
            databaseURL: `https://${id}-default-rtdb.firebaseio.com`
        });

        const dbRef = firebaseAdmin.database().ref('/');
        const snapshot = await dbRef.once('value');
        const data = snapshot.val();

        const replacedData = replaceInvalidKeys(data);

        fs.writeFileSync('database.json', JSON.stringify(replacedData, null, 4), 'utf8');
        console.log('Data saved to database.json file successfully.');

        start('main.js');
    } catch (error) {
        console.error('Error fetching data or saving to database.json:', error);
    }
}

function replaceInvalidKeys(obj) {
    const newObj = {};
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const newKey = key.replace(/,/g, '.'); // استبدال ',' ب'.'
            newObj[newKey] = obj[key];
            if (typeof obj[key] === 'object') {
                newObj[newKey] = replaceInvalidKeys(obj[key]);
            }
        }
    }
    return newObj;
}

fetchDataAndSave();

¿?¿? ¿?¿? ¿?¿? ¿?¿? ¿?¿? ¿?¿? ¿?¿? ¿?¿?
_______________________________________
¿?¿? ¿?¿? ¿?¿? ¿?¿? ¿?¿? ¿?¿? ¿?¿? ¿?¿?

> *`in 'main.js'`*
//DATA UPDATE >>
const serviceAccount = JSON.parse(readFileSync('./firebase-key.json', 'utf8'));
const id = serviceAccount.project_id
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: `https://${id}-default-rtdb.firebaseio.com`
});

async function fetchCurrentDataFromFirebase() {
    const dbRef = firebaseAdmin.database().ref('/');
    const snapshot = await dbRef.once('value');
    return snapshot.val() || {};
}

function loadDataAndReplaceInvalidKeys() {
    const data = JSON.parse(readFileSync('database.json', 'utf8'));
    return replaceInvalidKeys(data);
}

function replaceInvalidKeys(obj) {
    const newObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = key.replace(/\./g, ','); // استبدال كل '.' بـ ','
            newObj[newKey] = obj[key];
            if (typeof obj[key] === 'object') {
                newObj[newKey] = replaceInvalidKeys(obj[key]);
            }
        }
    }
    return newObj;
}

function mergeData(currentData, newData) {
    for (let key in newData) {
        if (newData.hasOwnProperty(key)) {
            if (typeof newData[key] === 'object' && newData[key] !== null) {
                if (!currentData[key]) {
                    currentData[key] = {};
                }
                mergeData(currentData[key], newData[key]);
            } else {
                currentData[key] = newData[key];
            }
        }
    }
}

async function saveDataToFirebase() {
    const dbRef = firebaseAdmin.database().ref('/');
    const currentData = await fetchCurrentDataFromFirebase();
    const newData = loadDataAndReplaceInvalidKeys();
    mergeData(currentData, newData);
    await dbRef.set(currentData);
    console.log('Database update complete << 200');
}

setInterval(saveDataToFirebase, 60000);
  
