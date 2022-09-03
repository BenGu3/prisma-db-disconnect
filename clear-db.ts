import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import times from 'lodash/times'

const prisma = new PrismaClient()

async function main() {
  await prisma.friendRequest.deleteMany()
  await prisma.user.deleteMany()
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
