export const preventBucketDuplicate = async (context) => {
  const { total } = await context.service.find({
    query: {
      userId: context.params.user.id,
      activityId: context.data.activityId,
      $limit: 0
    }
  })
 
  if (total > 0) {
    throw new Error('You have already Activity in Bucket ')
  }
}
