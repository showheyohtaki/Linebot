import { Datastore } from '@google-cloud/datastore'
import { Entity, Entities } from '@google-cloud/datastore/build/src/entity'

const datastore = new Datastore()

export const datastoreInsert = async (
  kind: string,
  data: Entity
): Promise<void> => {
  await datastoreUpdate(null, kind, data)
}

export const datastoreUpdate = async (
  id: string | null,
  kind: string,
  data: Entity
): Promise<void> => {
  let key
  if (id) {
    key = datastore.key([kind, parseInt(id, 10)])
  } else {
    key = datastore.key(kind)
  }

  await datastore.save({ key, data })
}

export const datastoreGet = async (kind: string): Promise<Entities> => {
  return await datastoreGetWhere(kind, null, null)
}

export const datastoreGetWhere = async (
  kind: string,
  columnName: string | null,
  data: Entity | null
): Promise<Entities> => {
  let query
  if (columnName) {
    query = datastore.createQuery(kind).filter(columnName, '=', data)
  } else {
    query = datastore.createQuery(kind)
  }

  const [entities] = await datastore.runQuery(query)
  return entities
}

export const datastoreGetFindBy = async (
  kind: string,
  columnName: string | null,
  data: Entity | null
): Promise<Entity> => {
  let query
  if (columnName) {
    query = datastore.createQuery(kind).filter(columnName, '=', data)
  } else {
    query = datastore.createQuery(kind)
  }

  const [entities] = await datastore.runQuery(query)
  return entities[0]
}

export const datastoreDelete = async (data: Entities): Promise<void> => {
  await datastore.delete(data)
}
