import { virtual, resolve } from '@feathersjs/schema'

export const showSaved = async (context) => {
  const { result, user } = context
  const { id: userId } = context.params.user // Replace '_id' with the actual user ID field

  const savedIds = await context.app.service('saves').find({
    query: {
      userId,
      $select: ['activityId', 'id']
    }
  })

  const likedIds = await context.app.service('likes').find({
    query: {
      userId,
      $select: ['activityId', 'id']
    }
  })

  const allLikedIds = await context.app.service('likes').find({
    query: {
      $select: ['activityId', 'id']
    }
  })

  const allSavedIds = await context.app.service('saves').find({
    query: {
      $select: ['activityId', 'id']
    }
  })

  const bucketIds = await context.app.service('bucket-list').find({
    query: {
      userId,
      $select: ['activityId', 'id']
    }
  })

  const activityIds = result.data.map((activity) => activity.parentCompany)
  const allActivityIds = result.data.map((activity) => activity.id)

  const companyPhones = await context.app.service('companies').find({
    query: {
      id: { $in: activityIds },
      $select: ['companyPhone', 'id']
    }
  })

  const companyPhonesIds = companyPhones.data.map((co) => ({
    id: co.id.toString(),
    phone: co.companyPhone
  }))

  const likedActivityIds = likedIds.data.map((like) => ({
    id: like.id.toString(),
    activityId: like.activityId
  }))

  const savedActivityIds = savedIds.data.map((saved) => ({
    id: saved.id.toString(),
    activityId: saved.activityId
  }))

  const bucketActivityIds = bucketIds.data.map((bucket) => ({
    id: bucket.id.toString(),
    activityId: bucket.activityId
  }))

  function findActivityIdWithOccurrences(arr1, arr2, minimumOccurrences) {
    const allItems = arr1.concat(arr2) // Combine the two arrays into one
    const occurrences = {} // Track the count of each activityId

    for (let item of allItems) {
      const activityId = item.activityId
      occurrences[activityId] = (occurrences[activityId] || 0) + 1 // Increment the count for each activityId
    }

    const activityIdsWithOccurrences = Object.keys(occurrences).filter(
      (activityId) => occurrences[activityId] >= minimumOccurrences
    )
    return activityIdsWithOccurrences
  }

  const mostpopular = findActivityIdWithOccurrences(
    allLikedIds.data,
    allSavedIds.data,
    process.env.MINIMUM_OCCURRENCES
  )


  result.data.forEach((activity) => {
    const saved = savedActivityIds.find((item) => item.activityId === activity.id.toString())
    const liked = likedActivityIds.find((item) => item.activityId === activity.id.toString())
    const bucket = bucketActivityIds.find((item) => item.activityId === activity.id.toString())
    const phone = companyPhonesIds.find((company) => company.id === activity.parentCompany)

    const popular= mostpopular.includes( activity.id.toString())
    const savedId = saved ? saved.id : ''
    const likedId = liked ? liked.id : ''
    const bucketId = bucket ? bucket.id : ''

    const isSaved = saved ? true : false
    const isLiked = liked ? true : false
    const isBucket = bucket ? true : false

    activity.isPopular = popular ? true : false

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
