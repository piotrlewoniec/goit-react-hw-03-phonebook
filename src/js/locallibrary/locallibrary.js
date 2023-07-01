import { localStorageSave, localStorageLoad } from '../system/localstorage';

function localStorageCreate(libraryName) {
  localStorageSave(libraryName, []);
}

export function localStorageGetStatus(libraryName, element, keySearch) {
  if (libraryName in localStorage) {
    const libraryLocal = localStorageLoad(libraryName);
    const elementLocal = libraryLocal.find(
      elementLoc => elementLoc[keySearch] === element
    );
    return elementLocal;
  }
}

export function localStorageAdd(libraryName, object) {
  if (libraryName in localStorage === false) {
    localStorageCreate(libraryName);
  }
  if (libraryName in localStorage) {
    const libraryLocal = localStorageLoad(libraryName);
    libraryLocal.push(object);
    localStorageSave(libraryName, libraryLocal);
  }
}

export function localStorageRemove(libraryName, element, keySearch) {
  if (libraryName in localStorage) {
    const libraryLocal = localStorageLoad(libraryName);
    const elementIndex = libraryLocal.findIndex(
      elementLoc => elementLoc[keySearch] === element
    );
    if (elementIndex > -1) {
      libraryLocal.splice(elementIndex, 1);
      localStorageSave(libraryName, libraryLocal);
    }
  }
}

export function localStorageUpdate(
  libraryName,
  oldElement,
  newElement,
  keySearch
) {
  if (libraryName in localStorage) {
    const libraryLocal = localStorageLoad(libraryName);
    const elementIndex = libraryLocal.findIndex(
      elementLoc => elementLoc[keySearch] === oldElement
    );
    if (elementIndex > -1) {
      libraryLocal[elementIndex].keySearch = newElement;
      localStorageSave(libraryName, libraryLocal);
    }
  }
}

/*
  const element = localStorageGetStatus(this.localStorageLibraryName, name, 'name'); //  libraryName, element, keySearch
  if (element !== undefined) {
    Notiflix.Notify.info('Contact allready exists in localstorage'); 
  } else {
    localStorageAdd(this.localStorageLibraryName, {id: id, name: name, number: number,}); //libraryName, object
  }

 
  const element = localStorageGetStatus(this.localStorageLibraryName, id,'id'); // libraryName, element, keySearch
  if (element !== undefined) {
    localStorageRemove(this.localStorageLibraryName, id,'id')
  } else {
    Notiflix.Notify.info('Contact does not exists in localstorage'); 
  }

  */
