import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import times from 'lodash/times'

const prisma = new PrismaClient()

async function main() {
  const userCount = 200
  const fetchCount = 17000

  console.log(`Creating ${userCount} users....`)
  const users = times(userCount, () => ({ id: faker.datatype.uuid(), email: faker.internet.email() }))
  await prisma.user.createMany({ data: users })
  console.log('Done creating users.')
  console.log()

  console.log(`Creating ${userCount * userCount} friend requests...`)
  const friendRequests = users.flatMap(sourceUser => {
    return users.map(targetUser => ({
      sourceId: sourceUser.id,
      targetId: targetUser.id,
    }))
  })
  await prisma.friendRequest.createMany({ data: friendRequests })
  console.log('Done creating friend requests.')
  console.log()

  console.log(`Fetching ${fetchCount} friend requests...`)
  const res = await prisma.friendRequest.findMany({ where: { OR: friendRequests.slice(0, fetchCount) }})
  console.log(`Done fetching ${res.length} friend requests.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
