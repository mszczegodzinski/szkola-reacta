import { useState, ChangeEvent, FormEvent } from 'react';

type FormData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  hobby: string;
};

export const FormWizard = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    hobby: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
  };

  const nextStep = (e: FormEvent) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = (e: FormEvent) => {
    e.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };

  switch (step) {
    case 1:
      return (
        <div>
          <h2>Step 1: Personal Information</h2>
          <form onSubmit={nextStep}>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit">Next</button>
          </form>
        </div>
      );
    case 2:
      return (
        <div>
          <h2>Step 2: Additional Information</h2>
          <form onSubmit={nextStep}>
            <label htmlFor="birthDate">Birth Date:</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="hobby">Hobby:</label>
            <input
              type="text"
              id="hobby"
              name="hobby"
              value={formData.hobby}
              onChange={handleChange}
              required
            />
            <br />
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="submit">Next</button>
          </form>
        </div>
      );
    case 3:
      return (
        <div>
          <h2>Step 3: Summary</h2>
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
          <div className="flex gap-x-3">
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      );
    default:
      return null;
  }
};
