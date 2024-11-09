import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
  BUCKET_NAME,
  BUCKET_REGION,
} from '@/config'
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { v4 } from 'uuid'

const s3Client = new S3Client({
  credentials:
    AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && AWS_SESSION_TOKEN
      ? {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
          sessionToken: AWS_SESSION_TOKEN,
        }
      : undefined,
  region: BUCKET_REGION,
})

export default s3Client

export const createDocument = async (file: File): Promise<string> => {
  // Create a specific uuid v4 to assign on the document on the s3 :)
  const docId = v4()
  const params = {
    Body: Buffer.from(await file.arrayBuffer()),
    Bucket: BUCKET_NAME,
    Key: docId,
    // Important thing here, add the type or every file will have
    // 'application/octet-stream'
    ContentType: file.type,
  }

  // Upload file to S3
  const uploadCommand = new PutObjectCommand(params)
  const response = await s3Client.send(uploadCommand)
  console.log('response', response)
  return docId
}

export const readDocument = async (
  docId: string
): Promise<{
  data: Uint8Array
  contentType: string
}> => {
  const readCommand = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: docId,
  })
  const object = await s3Client.send(readCommand)
  const byteArray = await object.Body?.transformToByteArray()
  if (byteArray === undefined) {
    throw new Error('File does not exist')
  }

  return {
    data: byteArray,
    contentType: object.ContentType ?? 'application/octet-stream',
  }
}

// This function will delete the file on S3 given an ID
export const deleteDocument = async (docId: string): Promise<void> => {
  const deleteCommand = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: docId,
  })

  await s3Client.send(deleteCommand)
}
