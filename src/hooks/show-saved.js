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

  const likedActivityIds = likedIds.data.map((like) => {
    return { id: like.id.toString(), activityId: like.activityId }
  })

  const savedActivityIds = savedIds.data.map((saved) => {
    return { id: saved.id.toString(), activityId: saved.activityId }
  })

  result.data.forEach((activity) => {
    const saved = savedActivityIds.find((item) => item.activityId === activity.id.toString())
    const liked = likedActivityIds.find((item) => item.activityId === activity.id.toString())
    const savedId = saved ? saved.id : ''
    const likedId = liked ? liked.id : ''
    const isSaved = saved ? true : false
    const isLiked = liked ? true : false
    activity.likedId = likedId
    activity.savedId = savedId
    activity.isLiked = isLiked
    activity.isSaved = isSaved
  })

  return context
}
