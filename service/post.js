import { postModel } from '../models/post'
import { pick, omit } from 'lodash'
import AplicationError from '../utils/aplicationError'
const insert = async (data, createdBy) => {
  const post = postModel.create({ ...data, createdBy: createdBy })
  return post
}

const find = async (
  id,
  { withDeleted = false, onlyDeleted = false, ...criteria } = {},
) => {
  let post
  if (withDeleted) {
    post = postModel.findOneWithDeleted({
      _id: id,
      ...pick(criteria, postModel.getAllowedProperties()),
    })
  } else if (onlyDeleted) {
    post = postModel.findOneDeleted({
      _id: id,
      ...pick(criteria, postModel.getAllowedProperties()),
    })
  } else {
    post = postModel.findOne({
      _id: id,
      ...pick(criteria, postModel.getAllowedProperties()),
    })
  }
  if ((await post) === null) {
    throw new AplicationError(`post with id: ${id} has removed o disabled`, 404)
  } else {
    return post
  }
}
const findAll = async ({
  withDeleted = false,
  onlyDeleted = false,
  offset = 0,
  limit = 10,
  sort = 'createdAt _id',
  all = false,
  ...criteria
} = {}) => {
  const posts = await postModel.paginate(
    { ...pick(criteria, postModel.getAllowedProperties()) },
    {
      offset,
      limit: all ? 99999999 : limit,
      sort,
      customFind: withDeleted
        ? 'findWithDeleted'
        : onlyDeleted
        ? 'findDeleted'
        : 'find',
      customCount: withDeleted
        ? 'countDocumentsWithDeleted'
        : onlyDeleted
        ? 'countDocumentsDeleted'
        : 'countDocuments',
    },
  )
  return posts
}

const patch = async (id, fields = {}, createdBy) => {
  const document = await find(id, {})
  if (document.createdBy === createdBy) {
    const post = postModel.findOneAndUpdate(
      { _id: id },
      omit(fields, ['_id']),
      {
        new: true,
      },
    )
    if ((await post) === null) {
      throw new AplicationError(
        `post with id: ${id} has removed o disabled`,
        404,
      )
    } else {
      return post
    }
  } else {
    throw new AplicationError(
      `This post belongs to another user, you do not have permission to modify it`,
      403,
    )
  }
}
const deleteOne = async (id, { hardDelete = false } = {}, createdBy) => {
  const document = await find(id, { withDeleted: true })
  if (document.createdBy === createdBy) {
    let response = null
    if (document) {
      if (hardDelete) {
        response = document.remove()
      } else {
        response = document.delete()
      }
    } else {
      throw new AplicationError(
        `user with id: ${id} has removed o disabled`,
        404,
      )
    }
    return response
  } else {
    throw new AplicationError(
      `This post belongs to another user, you do not have permission to modify it`,
      403,
    )
  }
}

const restore = async (id, createdBy) => {
  const document = await find(id, { onlyDeleted: true })
  if (document.createdBy === createdBy) {
    let response = null
    if (document) {
      response = await document.restore()
    } else {
      throw new AplicationError(
        `user with id: ${id} has removed o disabled`,
        404,
      )
    }
    return response
  } else {
    throw new AplicationError(
      `This post belongs to another user, you do not have permission to modify it`,
      403,
    )
  }
}
export { find, findAll, insert, patch, deleteOne, restore }
