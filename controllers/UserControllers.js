import asyncWrap from '../utils/asyncWrap.js'
import {
  findAll as userFindAll,
  find as userFind,
  insert as userInsert,
  patch as userPatch,
  deleteOne as userDelete,
  restore as userRestore
} from '../service/user.js'

const createDocument = asyncWrap(async (req, res) => {
  const user = await userInsert(req.body)
  res.json(user)
})
const findDocuments = asyncWrap(async (req, res) => {
  if (!req.params.id) {
    const users = await userFindAll({
      ...req.query,
      withDeleted: req.query.withDeleted === 'true' ? true : false,
      onlyDeleted: req.query.onlyDeleted === 'true' ? true : false,
      all: req.query.all === 'true' ? true : false,
    })
    res.json(users)
  } else {
    const user = await userFind(req.params.id, {
      ...req.query,
      withDeleted: req.query.withDeleted === 'true' ? true : false,
      onlyDeleted: req.query.onlyDeleted === 'true' ? true : false,
    })

    res.json(user)
  }
})

const patchDocument = asyncWrap(async (req, res) => {
  const user = await userPatch({ _id: req.params.id }, req.body)
  res.json(user)
})

const deleteDocument = asyncWrap(async (req, res) => {
  const user = await userDelete(req.params.id, {
    hardDelete: req.query.hardDelete === 'true' ? true : false,
  })
  res.json(user)
})
const restoreDocument = asyncWrap(async (req, res) => {
  const user = await userRestore(req.params.id)
  res.json(user)
})
export default {
  createDocument,
  findDocuments,
  patchDocument,
  deleteDocument,
  restoreDocument
}
