export const preventLikingEventDuplicate = async (context) => {
  const { total } = await context.service.find({
    query: {
      userId: context.params.user.id,
      eventId: context.data.eventId,
      $limit: 0
    }
  })
 
  if (total > 0) {
    throw new Error('You have already Liked Event')
  }
}
