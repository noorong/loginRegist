import { useRef } from "react";

export default function Register({ onSubmit }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitForm = (e) => {
    e.prevenDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const formData = {
      email,
      password,
    };

    onSubmit({ formData });
  };

  return (
    <div>
      <form>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            required
            ref={emailRef}
            id="email"
            type="email"
            name="email"
            autoComplete="off"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            required
            ref={passwordRef}
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
          />
        </fieldset>
        <button onClick={submitForm}>Reigster</button>
      </form>
    </div>
  );
}