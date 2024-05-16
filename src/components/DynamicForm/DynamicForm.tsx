import { useForm, type SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

import { Button, Input, Text } from '../../ui';
import { PersonalInfoForm, PersonalInfoFormSchema } from './types';

export const DynamicForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PersonalInfoForm>({
    defaultValues: {
      name: '',
      surname: '',
      interests: [
        {
          name: '',
        },
      ],
    },
    resolver: zodResolver(PersonalInfoFormSchema),
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'interests',
    control,
  });

  const handleFormSubmit: SubmitHandler<PersonalInfoForm> = (formData) => {
    console.log('Submitted data:', formData);
  };

  return (
    <div className="p-8">
      <h2 className="my-2">Personal info and interests - Dynamic form</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col gap-y-3">
          <Input label="name" {...register('name')} error={errors.name} />
          <Input label="surname" {...register('surname')} error={errors.surname} />
          <Text>Interests: </Text>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex items-center gap-x-2">
                <Input
                  label={`interest ${index + 1}`}
                  {...register(`interests.${index}.name` as const)}
                  error={errors?.interests?.[index]?.name}
                />
                <div className="flex h-8">
                  <Button type="button" onClick={() => remove(index)} className="bg-red-600 hover:bg-red-500">
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <Button
            type="button"
            onClick={() => append({ name: '' })}
            className="my-2 bg-emerald-600 hover:bg-emerald-500"
          >
            Add new
          </Button>
        </div>
        <div className="mt-6">
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
