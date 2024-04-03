import { Prisma } from "@prisma/client";
import { prisma } from "./prisma.client";

const tagData: Prisma.TagCreateInput[] = [
  { name: "adventure" },
  { name: "fiction" },
  { name: "non fiction" },
  { name: "science fiction" },
  { name: "romance" },
  { name: "drama" },
  { name: "history" },
  { name: "action" },
  { name: "horror" },
  { name: "thriller" },
];

const bookData: Prisma.BookCreateInput[] = [
  {
    title: "Adventure Book",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 4,
    writer: "John Doe",
  },
  {
    title: "History Book",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 5,
    writer: "Nathaniel Alpha",
  },
  {
    title: "Romance Forever",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 2,
    writer: "Marry Joe",
  },
  {
    title: "Haunted Mansion",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 7,
    writer: "Djo",
  },
  {
    title: "Rambo",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 3,
    writer: "Crhistie Marry",
  },
  {
    title: "Adventure Book 2",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 4,
    writer: "John Doe",
  },
  {
    title: "History Book 2",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 5,
    writer: "Nathaniel Alpha",
  },
  {
    title: "Romance Forever 2",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 2,
    writer: "Marry Joe",
  },
  {
    title: "Haunted Mansion 2",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 7,
    writer: "Djo",
  },
  {
    title: "Rambo 2",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 3,
    writer: "Crhistie Marry",
  },
  {
    title: "Adventure Book 3",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 4,
    writer: "John Doe",
  },
  {
    title: "History Book 3",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 5,
    writer: "Nathaniel Alpha",
  },
  {
    title: "Romance Forever 3",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 2,
    writer: "Marry Joe",
  },
  {
    title: "Haunted Mansion 3",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 7,
    writer: "Djo",
  },
  {
    title: "Rambo 3",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 3,
    writer: "Crhistie Marry",
  },
  {
    title: "Adventure Book 4",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 4,
    writer: "John Doe",
  },
  {
    title: "History Book 4",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 5,
    writer: "Nathaniel Alpha",
  },
  {
    title: "Romance Forever 4",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 2,
    writer: "Marry Joe",
  },
  {
    title: "Haunted Mansion 4",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 7,
    writer: "Djo",
  },
  {
    title: "Rambo 4",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 3,
    writer: "Crhistie Marry",
  },
  {
    title: "Adventure Book 5",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 4,
    writer: "John Doe",
  },
  {
    title: "History Book 5",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 5,
    writer: "Nathaniel Alpha",
  },
  {
    title: "Romance Forever 5",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 2,
    writer: "Marry Joe",
  },
  {
    title: "Haunted Mansion 5",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 7,
    writer: "Djo",
  },
  {
    title: "Rambo 5",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    price: 3,
    writer: "Crhistie Marry",
  },
];

const bookTagData: Prisma.BookTagCreateManyInput[] = [
  {
    bookId: 1,
    tagId: 11,
  },
  {
    bookId: 1,
    tagId: 12,
  },
  {
    bookId: 2,
    tagId: 17,
  },
  {
    bookId: 3,
    tagId: 15,
  },
  {
    bookId: 3,
    tagId: 16,
  },
  {
    bookId: 4,
    tagId: 19,
  },
  {
    bookId: 4,
    tagId: 20,
  },
  {
    bookId: 5,
    tagId: 18,
  },
  {
    bookId: 5,
    tagId: 11,
  },
  {
    bookId: 6,
    tagId: 11,
  },
  {
    bookId: 6,
    tagId: 12,
  },
  {
    bookId: 7,
    tagId: 17,
  },
  {
    bookId: 8,
    tagId: 15,
  },
  {
    bookId: 8,
    tagId: 16,
  },
  {
    bookId: 9,
    tagId: 19,
  },
  {
    bookId: 9,
    tagId: 20,
  },
  {
    bookId: 10,
    tagId: 18,
  },
  {
    bookId: 10,
    tagId: 11,
  },
  {
    bookId: 11,
    tagId: 11,
  },
  {
    bookId: 11,
    tagId: 12,
  },
  {
    bookId: 12,
    tagId: 17,
  },
  {
    bookId: 13,
    tagId: 15,
  },
  {
    bookId: 13,
    tagId: 16,
  },
  {
    bookId: 14,
    tagId: 19,
  },
  {
    bookId: 14,
    tagId: 20,
  },
  {
    bookId: 15,
    tagId: 18,
  },
  {
    bookId: 15,
    tagId: 11,
  },
  {
    bookId: 16,
    tagId: 11,
  },
  {
    bookId: 16,
    tagId: 12,
  },
  {
    bookId: 17,
    tagId: 17,
  },
  {
    bookId: 18,
    tagId: 15,
  },
  {
    bookId: 18,
    tagId: 16,
  },
  {
    bookId: 19,
    tagId: 19,
  },
  {
    bookId: 19,
    tagId: 20,
  },
  {
    bookId: 20,
    tagId: 18,
  },
  {
    bookId: 20,
    tagId: 11,
  },
  {
    bookId: 21,
    tagId: 11,
  },
  {
    bookId: 21,
    tagId: 12,
  },
  {
    bookId: 22,
    tagId: 17,
  },
  {
    bookId: 23,
    tagId: 15,
  },
  {
    bookId: 23,
    tagId: 16,
  },
  {
    bookId: 24,
    tagId: 19,
  },
  {
    bookId: 24,
    tagId: 20,
  },
  {
    bookId: 25,
    tagId: 18,
  },
  {
    bookId: 25,
    tagId: 11,
  },
];

async function main() {
  await prisma.tag.deleteMany();
  await prisma.book.deleteMany();
  await prisma.bookTag.deleteMany();

  await prisma.tag.createMany({ data: tagData });
  await prisma.book.createMany({ data: bookData });
  await prisma.bookTag.createMany({ data: bookTagData });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
