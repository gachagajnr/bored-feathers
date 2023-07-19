import { virtual, resolve } from '@feathersjs/schema'

export const showSavedEvents = async (context) => {
  const { result, user } = context
  if (context.params.user === undefined) {
    const eventIds = result.data.map((event) => event.parentCompany)
    const alleventIds = result.data.map((event) => event.id)

    const companyPhones = await context.app.service('companies').find({
      query: {
        id: { $in: eventIds },
        $select: ['companyPhone', 'id']
      }
    })

    const companyPhonesIds = companyPhones.data.map((co) => ({
      id: co.id.toString(),
      phone: co.companyPhone
    }))

    result.data.forEach((event) => {
      const phone = companyPhonesIds.find((company) => company.id === event.parentCompany)

      event.isPopular = false

      event.likedId = ''
      event.savedId = ''
      event.isLiked = false
      event.isSaved = false
      event.bucketId = ''
      event.isBucket = false
      event.companyPhone = phone.phone
    })

    return context
  } else {
    const savedIds = await context.app.service('saved-events').find({
      query: {
        userId: context.params.user.id,
        $select: ['eventId', 'id']
      }
    })

    const likedIds = await context.app.service('liked-events').find({
      query: {
        userId: context.params.user.id,
        $select: ['eventId', 'id']
      }
    })

    const allLikedIds = await context.app.service('liked-events').find({
      query: {
        $select: ['eventId', 'id']
      }
    })

    const allSavedIds = await context.app.service('saved-events').find({
      query: {
        $select: ['eventId', 'id']
      }
    })

    const bucketIds = await context.app.service('bucket-list-events').find({
      query: {
        userId: context.params.user.id,
        $select: ['eventId', 'id']
      }
    })

    const eventIds = result.data.map((event) => event.parentCompany)
    const alleventIds = result.data.map((event) => event.id)

    const companyPhones = await context.app.service('companies').find({
      query: {
        id: { $in: eventIds },
        $select: ['companyPhone', 'id']
      }
    })

    const companyPhonesIds = companyPhones.data.map((co) => ({
      id: co.id.toString(),
      phone: co.companyPhone
    }))

    const likedeventIds = likedIds.data.map((like) => ({
      id: like.id.toString(),
      eventId: like.eventId
    }))

    const savedeventIds = savedIds.data.map((saved) => ({
      id: saved.id.toString(),
      eventId: saved.eventId
    }))

    const bucketeventIds = bucketIds.data.map((bucket) => ({
      id: bucket.id.toString(),
      eventId: bucket.eventId
    }))

    function findeventIdWithOccurrences(arr1, arr2, minimumOccurrences) {
      const allItems = arr1.concat(arr2) // Combine the two arrays into one
      const occurrences = {} // Track the count of each eventId

      for (let item of allItems) {
        const eventId = item.eventId
        occurrences[eventId] = (occurrences[eventId] || 0) + 1 // Increment the count for each eventId
      }

      const eventIdsWithOccurrences = Object.keys(occurrences).filter(
        (eventId) => occurrences[eventId] >= minimumOccurrences
      )
      return eventIdsWithOccurrences
    }

    const mostpopular = findeventIdWithOccurrences(
      allLikedIds.data,
      allSavedIds.data,
      process.env.MINIMUM_OCCURRENCES
    )

    result.data.forEach((event) => {
      const saved = savedeventIds.find((item) => item.eventId === event.id.toString())
      const liked = likedeventIds.find((item) => item.eventId === event.id.toString())
      const bucket = bucketeventIds.find((item) => item.eventId === event.id.toString())
      const phone = companyPhonesIds.find((company) => company.id === event.parentCompany)

      const popular = mostpopular.includes(event.id.toString())
      const savedId = saved ? saved.id : ''
      const likedId = liked ? liked.id : ''
      const bucketId = bucket ? bucket.id : ''

      const isSaved = saved ? true : false
      const isLiked = liked ? true : false
      const isBucket = bucket ? true : false

      event.isPopular = popular ? true : false

      event.likedId = likedId
      event.savedId = savedId
      event.isLiked = isLiked
      event.isSaved = isSaved
      event.bucketId = bucketId
      event.isBucket = isBucket
      event.companyPhone = phone.phone
    })
 
    return context
  }
}
