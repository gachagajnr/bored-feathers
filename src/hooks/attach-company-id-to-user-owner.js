export const attachCompanyIdToUserOwner = async (context) => {
  await context.app
    .service('users')
    .patch(context.params.user.id, { company: context.result.id, isOwner: true })
}
