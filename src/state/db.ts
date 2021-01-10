import { openDB } from 'idb'
import { fotosPub } from './fotos';

const dbp = openDB('fotosPub', 1, {
  upgrade(db) {
    db.createObjectStore('fotosPub');
  },
});

export async function loadDB() {
  const db = await dbp
  const obj = await db.get('fotosPub', 'fotosPub')
  if (obj)
    fotosPub.load(obj)
}

export async function saveDB() {
  const db = await dbp
  await db.put('fotosPub', fotosPub.dump(), 'fotosPub')
}

setTimeout(loadDB, 100)