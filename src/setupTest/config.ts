// @ts-nocheck

import mongoose from 'mongoose'



export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
}

export const clearDatabase = async () => {
  const {collections} = mongoose.connection
  const collectionsKeys = Object.keys(collections)
  for (let i = 0; i < collectionsKeys.length; i += 1) {
    const collection = collections[collectionsKeys[i]]
    await collection.deleteMany()
  }
}
