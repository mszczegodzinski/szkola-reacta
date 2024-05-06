/**
 * Zadanie 4: Dynamiczny formularz
 * Przygotuj formularz, który będzie miał możliwość dodawania dynamicznych pól. To znaczy, że formularz ma zdefiniowanych kilka pól (możemy wciąż bazować na imieniu i nazwisku), ale możemy też stworzyć kilka dodatkowych. Będą to pola z zainteresowaniami użytkownika.
 * Instrukcje:
 * Stwórz formularz korzystając z React Hook Form, który będzie zawierał pola imię i nazwisko
 * Stwórz możliwość dodania zainteresowań użytkownika, ale w taki sposób, że będziemy mogli kliknąć w przycisk "add" aby pokazać na ekranie nowe pole typu input oraz "remove" aby takie pole usunąć z ekranu
 * Po wysłaniu formularza wyświetl dane na konsoli przeglądarki.
 */

import { useState, ChangeEvent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Input, Text } from '../../ui';
import { PersonalInfoForm, PersonalInfoFormSchema } from './types';

type FormData = {
  name: string;
  surname: string;
  interests: string[];
};

export const DynamicForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PersonalInfoForm>({
    resolver: zodResolver(PersonalInfoFormSchema),
  });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    interests: [],
  });
  const watchedFields = watch(['name', 'surname', 'interests']);
  // const [name, surname, interests] = watchedFields;

  console.log('watchedFields:', watchedFields);
  console.log('errors:', errors);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit: SubmitHandler<PersonalInfoForm> = () => {
    console.log('Submitted data:', formData);
  };

  const handleAddInput = () => {
    setFormData((prevState) => ({
      ...prevState,
      interests: [...prevState.interests, ''],
    }));
  };

  const handleInterestChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const newInterests = [...formData.interests];
    console.log('newInterests:', newInterests);
    newInterests[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      interests: newInterests,
    }));
  };
  console.log('formData:', formData);

  return (
    <div className="p-8">
      <h2 className="my-2">Personal info and interests - Dynamic form</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col gap-y-3">
          <Input label="name" {...register('name')} onChange={handleChange} error={errors.name} />
          <Input label="surname" {...register('surname')} onChange={handleChange} error={errors.surname} />
          <Text>Interests: </Text>
          {formData.interests.map((interest, index) => {
            console.log('register', register(`interests`));
            return (
              <Input
                key={`interest-${index}`}
                label={`interest ${index + 1}`}
                {...register(`interests`)}
                value={interest}
                error={errors.interests?.[index]}
                onChange={(e) => handleInterestChange(e, index)}
              />
            );
          })}
        </div>
        <div>
          <Button type="button" onClick={handleAddInput}>
            Add
          </Button>
        </div>
        {/* <div>
          <Button type="submit">Submit</Button>
        </div> */}
      </form>
    </div>
  );
};
