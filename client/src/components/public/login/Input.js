import InputField from "@/components/common/InputField";

export default function FormInput({ email, password, setEmail, setPassword }) {
  return (
    <div className="input">
      <InputField
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Email"
        required={true}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="login"
      />
      <div className="mt-3">
        <InputField
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="password"
          value={password}
          variant="login"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  );
}
