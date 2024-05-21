import { FormEvent, MouseEventHandler } from 'react';
import { Button } from '../../ui';

type FormWizardStepProps = {
  header: string;
  step: number;
  nextStep: (e: FormEvent) => void;
  prevStep: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

export const FormWizardStep = ({
  header,
  step,
  children,
  nextStep,
  prevStep,
}: FormWizardStepProps) => {
  return (
    <div className="p-8">
      <h2 className="my-2">{header}</h2>
      <form onSubmit={nextStep}>
        <div className="my-3">{children}</div>
        <div className="flex gap-x-3">
          <Button type="button" onClick={prevStep} disabled={step === 1}>
            Previous
          </Button>
          <Button type="submit">{step !== 3 ? 'Next' : 'Submit'}</Button>
        </div>
      </form>
    </div>
  );
};
