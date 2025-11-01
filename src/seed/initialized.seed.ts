import { DbContext } from '../context/db-context';
import { hash } from 'bcrypt';

export async function initializedSeed() {
  // create initialized roles an users if no exist

  const rolesCount = await DbContext.role.count();

  if (rolesCount === 0) {
    console.log(
      'no se encontro ningun rol en base de datos empezando a registrar roles iniciales',
    );

    const rolesCreate = await DbContext.role.createMany({
      data: [
        {
          name: 'ADMIN',
          createdAt: new Date(),
        },
        {
          name: 'USER',
          createdAt: new Date(),
        },
      ],
    });

    console.log('roles creado exitosamente', rolesCreate);
  }

  const userCount = await DbContext.user.count();

  if (userCount === 0) {
    console.log(
      'no se encontro ningun usuario empezando a registrar usuarios iniciales',
    );

    const passwordAdmin = await hash('admin', 10);

    const userAdmin = await DbContext.user.create({
      data: {
        username: 'admin',
        activo: true,
        contrasena: passwordAdmin,
        createdAt: new Date(),
        email: 'admin@cs.dev',
        verificado: true,
        role: {
          connect: { name: 'ADMIN' },
        },
      },
    });

    console.log('usuario "admin" creado correctamente: ', userAdmin);

    const passwordUser = await hash('user', 10);

    const userClient = await DbContext.user.create({
      data: {
        username: 'user',
        activo: true,
        contrasena: passwordUser,
        createdAt: new Date(),
        email: 'user@cs.dev',
        verificado: true,
        role: {
          connect: { name: 'USER' },
        },
      },
    });

    console.log('usuario "user" creado correctamente: ', userClient);
  }
}
