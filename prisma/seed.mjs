//mjs Para que pueda manejar los modulos actuales
//Todo: npx prisma db seed, codigo creado en el package.json para ejecutar la carga de datos directo desde la terminal
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //Al iniciar la funcion, primero nos a seguramos de borrar el contenido anterior
  await prisma.$executeRaw`DELETE FROM Department;`;
  //Luego, nos a seguramos de borrar la secuencia del id y que esta vuelva nuevamente a 0
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name ='Department';`;

  await prisma.department.deleteMany();
  //!Fucion para crear los departamentos
  await prisma.department.createMany({
    data: [{ name: "Tools" }, { name: "Paints" }, { name: "Electricity" }],
  });
  console.log("Departments Created");

  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: [
      {
        name: "Hammer",
        quantity: 15,
        price: 15.99,
        cost: 12.99,
        departmentId: 1,
      },
      {
        name: "White Paint",
        quantity: 25,
        price: 19.99,
        cost: 15.88,
        departmentId: 2,
      },
      {
        name: "Electricity Cable",
        quantity: 50,
        price: 4.99,
        cost: 2.99,
        departmentId: 3,
      },
    ],
  });
  console.log("productos han sido creados");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
