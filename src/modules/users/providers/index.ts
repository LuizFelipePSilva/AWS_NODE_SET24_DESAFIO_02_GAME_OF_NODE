import { container } from 'tsyringe';
import { IHashProvider } from './HashProvider/models/IHashProvider';
import BcryptHashProvider from './HashProvider/implementations/ByCriptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
