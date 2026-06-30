# Individual Learning Phase: Registration Form with TanStack Form

## Your Goal

You will create a practical registration form in React 19 using TanStack Form. You will set up the library, create a form instance with `useForm()`, connect input fields with `form.Field`, validate input, and display errors clearly in the UI.

## What You Need

- A running React 19 project
- Node.js and npm
- An editor like VS Code
- A terminal
- Basic knowledge of React with components, state, and events
- The `@tanstack/react-form` library

## Time Schedule

- **10 Minutes:** Prepare project and install `@tanstack/react-form`
- **20 Minutes:** Create basic form structure
- **20 Minutes:** Connect input fields with `form.Field`
- **25 Minutes:** Add validation rules with `validators`
- **15 Minutes:** Implement error display and small UI improvements
- **15 Minutes:** Test submission behavior and make data visible
- **15 Minutes:** Complete extension tasks

## Basic Tasks

### Task 1:

Prepare Form Project  
**Goal:** You set up the development environment for a form using TanStack Form.  

**Assignment:**  
In your React 19 project, create a new `RegistrationForm` component. Integrate the component into your App. Install `@tanstack/react-form` and check if the project starts without errors. Create a clear basic structure for the form, for example, with a heading, a form section, and a submit button.

Use this basic idea at the beginning:

```jsx
import { useForm } from "@tanstack/react-form";

export default function RegistrationForm() {
  const form = useForm({
    defaultValues: {
      firstName: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <h1>Seminar Registration</h1>
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Expected Result / Target State:**  
You see an empty but cleanly integrated form in the App with a heading like "Seminar Registration" and a submit button.

### Task 2:

Capture Form Data with `form.Field`  
**Goal:** You connect input fields with TanStack Form and capture user input.  

**Assignment:**  
Add these fields to the form:

- First Name
- Last Name
- Email
- Phone Number
- Role or Profession
- Checkbox for Newsletter
- Free text field for Notes

Create matching entries in `defaultValues` for all fields. Connect every visible input field with `form.Field`. Inside each field, use `field.state.value`, `field.handleChange(...)`, and `field.handleBlur`.

Example for a text field:

```jsx
<form.Field name="firstName">
  {(field) => (
    <label>
      First Name
      <input
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
      />
    </label>
  )}
</form.Field>
```

Example for a checkbox:

```jsx
<form.Field name="newsletter">
  {(field) => (
    <label>
      <input
        type="checkbox"
        checked={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.checked)}
      />
      Subscribe to newsletter
    </label>
  )}
</form.Field>
```

Initially, output the submitted data to the console after submission.

**Expected Result / Target State:**  
All fields are connected to TanStack Form. Upon submission, the entered values are passed completely as an object.

### Task 3:

Implement Required Fields and Simple Validation  
**Goal:** You add basic validation rules directly to the form fields.  

**Assignment:**  
Define meaningful validations for your form, for example:

- First Name: Required field
- Last Name: Required field
- Email: Required field and email format
- Phone Number: Optional or with minimum length
- Role or Profession: Required field
- Newsletter: Optional
- Notes: Maximum character count

Set the rules directly on the relevant `form.Field` using `validators`. For the beginning, `onBlur` is a good validation time.

Example:

```jsx
<form.Field
  name="email"
  validators={{
    onBlur: ({ value }) => {
      if (!value.trim()) {
        return "Please enter your email address.";
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Please enter a valid email address.";
      }

      return undefined;
    },
  }}
>
  {(field) => (
    <input
      type="email"
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(event) => field.handleChange(event.target.value)}
    />
  )}
</form.Field>
```

Ensure that the form is not successfully submitted if required fields are empty or invalid.

**Expected Result / Target State:**  
The form recognizes invalid or missing inputs and prevents successful submission as long as the rules are not met.

### Task 4:

Make Error Output Visible  
**Goal:** You display validation errors directly next to the affected fields.  

**Assignment:**  
Use `field.state.meta.errors` to display an understandable error message below each affected field. Phrase the messages so that it is clear what needs to be corrected, for example:

- "Please enter your first name."
- "Please enter a valid email address."
- "The note may be a maximum of 200 characters long."

Additionally, visually mark erroneous fields, for example, with a red border or a CSS class. Also use `aria-invalid` so the error is semantically recognizable.

Example:

```jsx
<input
  value={field.state.value}
  onBlur={field.handleBlur}
  onChange={(event) => field.handleChange(event.target.value)}
  aria-invalid={!field.state.meta.isValid}
/>
{!field.state.meta.isValid && (
  <p role="alert">{field.state.meta.errors.join(", ")}</p>
)}
```

**Expected Result / Target State:**  
Upon invalid input, understandable error messages appear directly next to the relevant field. Erroneous fields are visually clearly recognizable.

### Task 5:

Test Submission and Display Result in the Interface  
**Goal:** You test the form in a realistic workflow and make the result visible directly in the App.  

**Assignment:**  
Extend your form so that after a successful submission, the submitted data is also displayed below the form as a summary. Store the successfully submitted data in local state, for example `submittedData`.

Only show a summary if the form has been submitted validly. Test several cases:

- Empty required fields
- Invalid email
- Correctly filled out form
- Very long note

Check if error messages and success output function consistently.

**Expected Result / Target State:**  
After successful submission, a readable summary of the entered data appears below the form. No success output is displayed for invalid data.

## Extension Tasks

### Extension Task 1: Reset Form After Successful Submission

**Goal:** You improve the form's behavior after a successful submit.  

**Assignment:**  
Automatically reset the form after a successful submission, for example with the reset method of the form instance. Ensure that the summary of the most recently sent data remains visible. Check if checkboxes and text areas are also reset correctly.  

**Expected Result / Target State:**  
After successful submission, the form is empty again or reset to the desired initial state, while the last successful submission is still displayed.

### Extension Task 2: Enhance User-Friendly Validation

**Goal:** You improve the quality of validation and error messages.  

**Assignment:**  
Add at least two additional validation rules, for example:

- Phone number with only specific characters
- First name and last name with minimum length
- Notes must not consist only of spaces

Adjust the error messages accordingly and test all cases specifically.  

**Expected Result / Target State:**  
Your form reacts to further typical incorrect inputs and displays appropriate, understandable messages.

### Extension Task 3: Build Form Structure More Cleanly

**Goal:** You make your code more organized and maintainable.  

**Assignment:**  
Extract recurring parts such as labels, inputs, and error messages into a small reusable component, for example, `TextField`. Use this component for at least three form fields. Ensure that `field.state.value`, `field.handleChange`, `field.handleBlur`, and the error messages continue to function correctly.

**Expected Result / Target State:**  
Your form is functionally unchanged, but your code is structured and more reusable.

### Extension Task 4: Connect Submit Button to Form State

**Goal:** You use the TanStack Form state for a better user interface.  

**Assignment:**  
Use `form.Subscribe` to read `state.canSubmit` and `state.isSubmitting`. Disable the submit button when the form cannot be submitted or is currently submitting. Change the button text to "Submitting..." while submitting.

Example:

```jsx
<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
  {([canSubmit, isSubmitting]) => (
    <button type="submit" disabled={!canSubmit}>
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  )}
</form.Subscribe>
```

**Expected Result / Target State:**  
The button visibly reacts to the form state. Users can better understand whether the form is currently submitting or still contains errors.

## Important Notes

- Work step-by-step and test after each task.
- Create a unique entry in `defaultValues` for each field.
- Use a matching `form.Field` for every input field.
- Use `event.target.value` for text fields.
- Use `event.target.checked` for checkboxes.
- Ensure that error messages always belong directly to the correct field.
- Deliberately test incorrect inputs.
- Keep the interface simple but clearly readable.
- If you finish early, work on the extension tasks in the specified order.

## Reflection Questions

- What advantages does TanStack Form offer you compared to manual form handling?
- How do `defaultValues` help you understand the structure of your form data?
- For which fields was validation easiest, and for which was it most complex?
- How understandable are your error messages from a user's perspective?
- Which parts of your form would you make reusable next?
- What else would you improve in your form to make it more production-ready?
