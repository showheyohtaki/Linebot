import { Storage } from '@google-cloud/storage'
import { SaveOptions } from '@google-cloud/storage/build/src/file'
import dotenv from 'dotenv'
import { Readable, Writable } from 'stream'

const storage = new Storage()
dotenv.config()

const bucketName = process.env.GCP_BUCKET_NAME as string

export const storageUploadToBuffer = async (
  buffer: Buffer,
  path: string,
  options?: SaveOptions
): Promise<void> => {
  await storage.bucket(bucketName).file(path).save(buffer, options)
}

export const storageUploadToStream = (
  stream: Readable,
  path: string,
  options?: SaveOptions
): Promise<void> =>
  new Promise((resolve) => {
    const outputStream = storage
      .bucket(bucketName)
      .file(path)
      .createWriteStream(options)
    stream.pipe(outputStream).on('finish', () => resolve())
  })

export const storageGetUploadToStream = (
  path: string,
  options?: SaveOptions
): Writable => storage.bucket(bucketName).file(path).createWriteStream(options)

export const storageGetFileStream = (path: string): Readable =>
  storage.bucket(bucketName).file(path).createReadStream()

export const storageFileDelete = async (path: string): Promise<void> => {
  await storage.bucket(bucketName).file(path).delete()
}
