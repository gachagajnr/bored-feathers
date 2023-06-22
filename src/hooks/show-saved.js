import { virtual, resolve } from '@feathersjs/schema'

export const showSaved = async (context) => {
  const { result, user } = context

  const savedIds = await context.app.service('saves').find({
    query: {
      userId: context.params.user.id, // Replace '_id' with the actual user ID field
      $select: ['activityId', 'id']
    }
  })

  const likedIds = await context.app.service('likes').find({
    query: {
      userId: context.params.user.id, // Replace '_id' with the actual user ID field
      $select: ['activityId', 'id']
    }
  })

  const bucketIds = await context.app.service('bucket-list').find({
    query: {
      userId: context.params.user.id, // Replace '_id' with the actual user ID field
      $select: ['activityId', 'id']
    }
  })
  const activityIds = result.data.map((activity) => activity.parentCompany)

  const companyPhones = await context.app.service('companies').find({
    query: {
      id: { $in: activityIds },
      $select: ['companyPhone', 'id']
    }
  })

  const companyPhonesIds = companyPhones.data.map((co) => {
    return { id: co.id.toString(), phone: co.companyPhone }
  })
  const likedActivityIds = likedIds.data.map((like) => {
    return { id: like.id.toString(), activityId: like.activityId }
  })

  const savedActivityIds = savedIds.data.map((saved) => {
    return { id: saved.id.toString(), activityId: saved.activityId }
  })

  const bucketActivityIds = bucketIds.data.map((bucket) => {
    return { id: bucket.id.toString(), activityId: bucket.activityId }
  })

  result.data.forEach((activity) => {
    const saved = savedActivityIds.find((item) => item.activityId === activity.id.toString())
    const liked = likedActivityIds.find((item) => item.activityId === activity.id.toString())
    const bucket = bucketActivityIds.find((item) => item.activityId === activity.id.toString())
    const phone = companyPhonesIds.find((company) => company.id === activity.parentCompany)
    const savedId = saved ? saved.id : ''
    const likedId = liked ? liked.id : ''
    const bucketId = bucket ? bucket.id : ''

    const isSaved = saved ? true : false
    const isLiked = liked ? true : false
    const isBucket = bucket ? true : false

    activity.likedId = likedId
    activity.savedId = savedId
    activity.isLiked = isLiked
    activity.isSaved = isSaved
    activity.bucketId = bucketId
    activity.isBucket = isBucket
    activity.companyPhone = phone.phone
  })

  return context
}
