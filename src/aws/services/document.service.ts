import { createDocument, readDocument } from '..'
/**
 *
 * @param params bucketName, file
 * @returns Id del documento
 * @throws Error al subir el archivo
 */
export const insertDocument = async (params: {
  bucketName: string
  file: File
}): Promise<string> => {
  try {
    const docId = await createDocument(params.file)
    return docId
  } catch (error) {
    throw new Error('Error al subir el archivo')
  }
}
/**
 *
 * @param params bucketName, docId
 * @returns Documento
 * @throws Error al obtener el archivo
 */
export const getDocument = async (params: {
  bucketName: string
  docId: string
}): Promise<{
  data: Uint8Array
  contentType: string
}> => {
  try {
    return await readDocument(params.docId)
  } catch (error) {
    throw new Error('Error al obtener el archivo')
  }
}
