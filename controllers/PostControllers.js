import asyncWrap from '../utils/asyncWrap.js'
import {
  find as postFind,
  findAll as postFindAll,
  insert as postInsert,
  deleteOne as postDelete,
  patch as postPatch,
  restore as postRestore,
} from '../service/post'

const createDocument = asyncWrap(async (req, res) => {
  const imgUrl = req.file.location
  const createdBy = req.accessToken.username
  const post = await postInsert(req.body, createdBy, imgUrl)
  res.json(post)
})

const findDocuments = asyncWrap(async (req, res) => {
  if (!req.params.id) {
    const posts = await postFindAll({
      ...req.query,
      withDeleted: req.query.withDeleted === 'true' ? true : false,
      onlyDeleted: req.query.onlyDeleted === 'true' ? true : false,
      all: req.query.all === 'true' ? true : false,
    })
    res.json(posts)
  } else {
    const post = await postFind(req.params.id, {
      ...req.query,
      withDeleted: req.query.withDeleted === 'true' ? true : false,
      onlyDeleted: req.query.onlyDeleted === 'true' ? true : false,
    })

    res.json(post)
  }
})

const patchDocument = asyncWrap(async (req, res) => {
  const createdBy = req.accessToken.username
  const post = await postPatch({ _id: req.params.id }, req.body, createdBy)
  res.json(post)
})

const deleteDocument = asyncWrap(async (req, res) => {
  const createdBy = req.accessToken.username
  const post = await postDelete(
    req.params.id,
    {
      hardDelete: req.query.hardDelete === 'true' ? true : false,
    },
    createdBy,
  )
  res.json(post)
})
const restoreDocument = asyncWrap(async (req, res) => {
  const createdBy = req.accessToken.username
  const post = await postRestore(req.params.id, createdBy)
  res.json(post)
})
export default {
  findDocuments,
  createDocument,
  patchDocument,
  deleteDocument,
  restoreDocument,
}
