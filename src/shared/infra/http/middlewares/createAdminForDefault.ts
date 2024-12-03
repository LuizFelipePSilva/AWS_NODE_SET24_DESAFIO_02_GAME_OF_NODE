import { getRepository } from "typeorm";
import bcrypt from 'bcryptjs';
import  User from "@modules/users/infra/typeorm/entities/User";

async function createAdminUser() {
  const userRepository = getRepository(User);
  
  console.log("Verificando existência do usuário admin...");

  const existingUser = await userRepository.findOne({ where: { email: 'admin@gmail.com' } });
  
  if (!existingUser) {
    console.log("Usuário admin não encontrado, criando agora...");
    const hashedPassword = await bcrypt.hash('12345678', 8);

    const user = userRepository.create({
      fullName: 'admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      createdAt: new Date(),
    });

    await userRepository.save(user);
    console.log('Usuário admin criado com sucesso.');
  } else {
    console.log('Usuário admin já existe.');
  }
}

export default createAdminUser;