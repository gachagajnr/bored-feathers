export const preventLikingDuplicate = async (context) => {
  // console.log(context.data, context.params.user.id)
  const { total } = await context.service.find({
    query: {
      userId: context.params.user.id,
      activityId: context.data.activityId,
      $limit: 0
    }
  })
  console.log(total)

  if (total > 0) {
    throw new Error('You have already Liked Activity')
  }
}
