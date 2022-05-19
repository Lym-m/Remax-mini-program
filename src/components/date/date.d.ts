import { ComponentType } from 'react';

declare const MyDate: ComponentType<{
  'default-date': number;
  'bind:sync': (e: any) => void;
}>;

export default MyDate;
