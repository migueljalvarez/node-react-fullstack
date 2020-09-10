import { userModel } from '../models/user'
import { pick, omit } from 'lodash'
import AplicationError from '../utils/aplicationError'
import md5 from 'md5'

const auth = async (email, password)=>{
  const user = await userModel.findOne({email: email, password: md5(password)})
  if (user) {
    if(user.password === md5(password)){
      return user
    } else {
      throw new AplicationError('Wrong email/password combination', 401)
    }
  }
  if((await user) === null) {
    throw new AplicationError('user not registered / not verified', 401)
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
  
  const users = await userModel.paginate(
    { ...pick(criteria, userModel.getAllowedProperties()) },
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
  console.log(users);
  return users
}
const find = async (
  id,
  { withDeleted = false, onlyDeleted = false, ...criteria } = {},
) => {
  let user
  if (withDeleted) {
    user = userModel.findOneWithDeleted({
      _id: id,
      ...pick(criteria, userModel.getAllowedProperties()),
    })
  } else if (onlyDeleted) {
    user = userModel.findOneDeleted({
      _id: id,
      ...pick(criteria, userModel.getAllowedProperties()),
    })
  } else {
    user = userModel.findOne({
      _id: id,
      ...pick(criteria, userModel.getAllowedProperties()),
    })
  }
  if ((await user) === null) {
    throw new AplicationError(`user with id: ${id} has removed o disabled`, 404)
  } else {
    return user
  }
}
const insert = async (data) => {
  return new userModel({ ...data, password: md5(data.password) }).save()
}
const patch = async (id, fields = {}) => {
  const user = userModel.findOneAndUpdate({ _id: id }, omit(fields, ['_id']), {
    new: true,
  })
  if ((await user) === null) {
    throw new AplicationError(`user with id: ${id} has removed o disabled`, 404)
  } else {
    return user
  }
}
const deleteOne = async (id, { hardDelete = false } = {}) => {
  const document = await find(id, { withDeleted: true })
  let response = null
  if (document) {
    if (hardDelete) {
      response = document.remove()
    } else {
      response = document.delete()
    }
  } else {
    throw new AplicationError(`user with id: ${id} has removed o disabled`, 404)
  }
  return response
}

const restore = async (id) => {
  const document = await find(id, { onlyDeleted: true })
  let response = null
  if (document) {
    response = await document.restore()
  } else {
    throw new AplicationError(`user with id: ${id} has removed o disabled`, 404)
  }
  return response
}

export { find, findAll, insert, patch, deleteOne, restore, auth }
