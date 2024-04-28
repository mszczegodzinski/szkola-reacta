import { useState, ChangeEvent, FormEvent } from 'react';
import { FormWizardStep } from './FormWizardStep';
import { Header, Text } from '../../ui';
import { z } from 'zod';

type FormData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  hobby: string;
};

const FieldHistorySchema = z.object({
  fieldName: z.string(),
  fieldValue: z.string().min(2, 'Value must contains at least 2 characters'),
  updated: z.string(),
});

type FieldHistory = z.infer<typeof FieldHistorySchema>;

export const FormWizard = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    hobby: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [fieldsHistory, setFieldsHistory] = useState<
    { name: string; history: FieldHistory[] }[]
  >([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const nextStep = (e: FormEvent) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    alert('form submitted');
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const result = FieldHistorySchema.safeParse({
      fieldName: name,
      fieldValue: value,
      updated: new Date().toLocaleString(),
    });

    if (!result.success) {
      setError(result.error?.issues[0].message);
      return;
    }

    const fieldHistory = localStorage.getItem(name);
    const fieldHistoryParsed: FieldHistory[] = fieldHistory
      ? JSON.parse(fieldHistory)
      : [];
    const currentField = {
      fieldName: name,
      fieldValue: value,
      updated: new Date().toLocaleString(),
    };
    localStorage.setItem(
      name,
      JSON.stringify([...fieldHistoryParsed, currentField]),
    );
    setFieldsHistory((prevState) => {
      const fieldIndex = prevState.findIndex((field) => field.name === name);
      if (fieldIndex === -1) {
        return [...prevState, { name, history: [currentField] }];
      }
      return prevState.map((fieldHistory) =>
        fieldHistory.name === name
          ? { name, history: [...fieldHistory.history, currentField] }
          : fieldHistory,
      );
    });
  };

  switch (step) {
    case 1:
      return (
        <>
          <FormWizardStep
            header="Step 1: Personal Information"
            step={1}
            nextStep={nextStep}
            prevStep={prevStep}
          >
            <div className="flex flex-col gap-y-3">
              <div className="flex gap-4">
                <label htmlFor="firstName">
                  <Text>First Name:</Text>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="rounded border border-solid border-slate-800 px-2 py-1"
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex gap-4">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="rounded border border-solid border-slate-800 px-2 py-1"
                  onBlur={handleBlur}
                />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </FormWizardStep>
          <div className="px-8">
            <Header headingLevel="h4">Change history:</Header>
            <ul>
              {fieldsHistory.map((field, index) => (
                <li key={index}>
                  {field.history.map((history, index) => (
                    <Text
                      key={`history-${index}`}
                    >{`${field.name}: ${history.fieldValue}, updated: ${history.updated}`}</Text>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    case 2:
      return (
        <FormWizardStep
          header="Step 2: Additional Information"
          step={2}
          nextStep={nextStep}
          prevStep={prevStep}
        >
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-4">
              <label htmlFor="birthDate">Birth Date:</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
                className="rounded border border-solid border-slate-800 px-2 py-1"
              />
            </div>
            <div className="flex gap-4">
              <label htmlFor="hobby">Hobby:</label>
              <input
                type="text"
                id="hobby"
                name="hobby"
                value={formData.hobby}
                onChange={handleChange}
                required
                className="rounded border border-solid border-slate-800 px-2 py-1"
              />
            </div>
          </div>
        </FormWizardStep>
      );
    case 3:
      return (
        <FormWizardStep
          header="Step 3: Review"
          step={3}
          nextStep={handleSubmit}
          prevStep={prevStep}
        >
          <p>
            <strong>First Name:</strong> {formData.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {formData.lastName}
          </p>
          <p>
            <strong>Birth Date:</strong> {formData.birthDate}
          </p>
          <p>
            <strong>Hobby:</strong> {formData.hobby}
          </p>
        </FormWizardStep>
      );
    default:
      return null;
  }
};
