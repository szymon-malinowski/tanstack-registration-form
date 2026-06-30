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
