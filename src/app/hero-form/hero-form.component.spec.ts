import { FormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { HeroFormComponent } from './hero-form.component';

describe('HeroFormComponent', () => {
  it('should render form with prefilled values', async () => {
    await render(HeroFormComponent, {
      imports: [FormsModule],
    });

    expect(screen.getByText('Hero Form')).toBeTruthy();
    
    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    const alterEgoInput = screen.getByLabelText('Alter Ego') as HTMLInputElement;
    const powerSelect = screen.getByLabelText('Hero Power') as HTMLSelectElement;

    expect(nameInput.value).toBe('Dr. IQ');
    expect(alterEgoInput.value).toBe('Chuck Overstreet');
    expect(powerSelect.value).toBe('Really Smart');
  });

  it('should clear fields on "New Hero" button click', async () => {
    await render(HeroFormComponent, {
      imports: [FormsModule],
    });

    await userEvent.click(screen.getByRole('button', { name: 'New Hero', }));

    expect((screen.getByLabelText('Name') as HTMLInputElement).value).toBe('');
    expect((screen.getByLabelText('Alter Ego') as HTMLInputElement).value).toBe('');
    expect((screen.getByLabelText('Hero Power') as HTMLSelectElement).value).toBe('');
  });

  it('should render submitted form on "Submit" button click', async () => {
    await render(HeroFormComponent, {
      imports: [FormsModule],
    });

    await userEvent.click(screen.getByRole('button', { name: 'New Hero', }));
    await userEvent.type(screen.getByLabelText('Name'), 'RubberMan');
    await userEvent.type(screen.getByLabelText('Alter Ego'), 'Tyr Pirelli');
    await userEvent.selectOptions(screen.getByLabelText('Hero Power'), 'Super Flexible');

    await userEvent.click(screen.getByRole('button', { name: 'Submit', }));


    expect(screen.getByText('You submitted the following:')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Edit', }));
  });
});
