import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system';

let dbPath = 'poraque.db'
try{
dbPath = `${FileSystem.documentDirectory}SQLite/poraque.db`;
}
catch(err){
console.log(err)
}
const db = SQLite.openDatabase(dbPath)

function createDB(){
  try{ 
    db.transaction(tx =>{
        tx.executeSql('CREATE TABLE IF NOT EXISTS events_saved (id TEXT PRIMARY KEY );')
    }, null, saveDatabaseFile)
  }
  catch(err){
  console.log(err)
  }

}

function insertDB(id){
  try{
    db.transaction(tx =>{ 
        tx.executeSql(`INSER INTO events_saved (id) VALUES (${id});`)
    },null, saveDatabaseFile)
  }
  catch(err){
  console.log(err)
  }
}


function selectALL(){
  try{
    return new Promise((resolve, reject) => {
    db.transaction(tx =>{
        tx.executeSql(`SELECT * FROM events_saved;`, [],
        (txObj, { rows: { _array } }) => resolve(_array),
        (txObj, error) => reject(error));
    });
    });
  }
  catch(err){
  console.log(err)
  return []
  }
};

 function deleteEventSaved(id){
  try{
    db.transaction(tx =>{
        tx.executeSql('DELETE FROM events_saved where id = ?', [id])
    },null, saveDatabaseFile)
  }
  catch(err){
  console.log(err)
  }
  }


function saveDatabaseFile() {
  try{
    const dbPath = `${FileSystem.documentDirectory}SQLite/poraque.db`;
    FileSystem.copyAsync({
      from: `${SQLite._DB_NAME}`,
      to: dbPath,
    })
      .then(() => {
        console.log('Database saved at:', dbPath);
      })
      .catch(error => {
        console.log('Error saving database:', error);
      });
    }
    catch(err){
    console.log(err)
    }  
  }

  function checkExistsOnDB(id){
    try{
    return new Promise((resolve, reject) => {
        db.transaction(tx =>{
            tx.executeSql(`SELECT * FROM events_saved WHERE id = ${id};`, [],
            (txObj, { rows: { _array } }) => resolve(_array.length > 0),
            (txObj, error) => reject(error)
          );
        });
    });
    }
    catch(err){
      console.log(err)
      return false;
    }  
  }

  export {createDB, insertDB, deleteEventSaved, selectALL, checkExistsOnDB};