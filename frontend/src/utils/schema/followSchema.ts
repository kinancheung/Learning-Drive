import { object, SchemaOf, string } from 'yup';

export interface followFormFields {
  userId?: string;
}

export const followFormSchema: SchemaOf<followFormFields> = object().shape({
  userId: string(),
});
