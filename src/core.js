const getKeys = (obj) => Object.keys(obj)

const getSubtractedKeys = (obj1, obj2) => {
  return getKeys(obj1).filter(a => !getKeys(obj2).includes(a))
}

const getIntersectionKeys = (obj1, obj2) => {
  return getKeys(obj1).filter(a => getKeys(obj2).includes(a))
}

// 1 если во втором файле нет ключа из первого(значит удален) -
// 2 если в первом файле нет ключа но он есть во втором +
// 3 если ключ есть в обоих файлах но значения разные (мы удалили первую пару ключ-значение) -
// 4 если мы заменили ключ-значение с другим значением +
// 5 если ничего не меняли (пробел)
const getChangedUnchanget = (obj1, obj2) => {
  const result = {}
  const keys = getIntersectionKeys(obj1, obj2)
  for (let key of keys) {
    if (obj1[key] == obj2[key]) {
      result[key] = 'unchanged'
    } else {
      result[key] = 'changed'
    }
  }
  return result
}

const getDeletetAdded = (obj1, obj2) => {
  const result = {}
  const del = getSubtractedKeys(obj1, obj2)

  for (let key of del) {
    result[key] = 'deleted'
  }

  const add = getSubtractedKeys(obj2, obj1)
  for (let key of add) {
    result[key] = 'added'
  }
  return result
}

const getObjMap = (obj1, obj2) => {
  return { ...getChangedUnchanget(obj1, obj2), ...getDeletetAdded(obj1, obj2) }
}


const getDiffText = (objectsMap, obj1, obj2) => {
  const sep = '  '
  let textResult = ''
  const sortKeys = getKeys(objectsMap).sort()
  for (let key of sortKeys) {
    if (objectsMap[key] === 'unchanged') {
      textResult += sep + `${key}: ${obj1[key]}`
    }
    if (objectsMap[key] === 'changed') {
      textResult += sep + `- ${key}: ${obj1[key]}` + '\n'
      textResult += sep + `+ ${key}: ${obj2[key]}`
    }
    if (objectsMap[key] === 'deleted') {
      textResult += sep + `- ${key}: ${obj1[key]}`
    }
    if (objectsMap[key] === 'added') {
      textResult += sep + `+ ${key}: ${obj2[key]}`
    }
    textResult += '\n'
  }
  return `{\n${textResult}}`
}

export const getDiff = (obj1, obj2) => {
  const objMap = getObjMap(obj1, obj2)
  return getDiffText(objMap, obj1, obj2)
}

