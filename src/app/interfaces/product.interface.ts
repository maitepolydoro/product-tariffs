import { Tariff } from './tariffs.interface';

export interface Product {
    name: string;
    tariffs: Tariff[];
}
