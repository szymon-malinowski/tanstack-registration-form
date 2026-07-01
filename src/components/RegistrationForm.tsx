import { useForm } from "@tanstack/react-form";

export default function RegistrationForm() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="bg-gray-400">
      <form
        className="flex flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <h1 className="text-center">Seminar Registration</h1>
        <form.Field name="firstName">
          {(field) => (
            <label>
              First Name
              <input
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            </label>
          )}
        </form.Field>
        <form.Field name="lastName">
          {(field) => (
            <label>
              Last Name
              <input
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            </label>
          )}
        </form.Field>
        <form.Field name="firstName">
          {(field) => (
            <label>
              Email
              <input
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            </label>
          )}
        </form.Field>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
