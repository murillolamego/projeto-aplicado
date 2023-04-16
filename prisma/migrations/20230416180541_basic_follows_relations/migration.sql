-- CreateTable
CREATE TABLE "UserFollows" (
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "UserFollows_pkey" PRIMARY KEY ("followerId","followingId")
);

-- CreateTable
CREATE TABLE "PetFollows" (
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "PetFollows_pkey" PRIMARY KEY ("followerId","followingId")
);

-- AddForeignKey
ALTER TABLE "UserFollows" ADD CONSTRAINT "UserFollows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollows" ADD CONSTRAINT "UserFollows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetFollows" ADD CONSTRAINT "PetFollows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetFollows" ADD CONSTRAINT "PetFollows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
