import React, { useState } from "react";

import Button from "components/Button";
import { LightboxContent, LightboxOverlay } from "components/Lightbox";
import { Password } from "components/Input";
import { Text } from "components/Text";

interface RequestPasswordProps {
  setPassword: (newPass: string) => void;
}

const RequestPassword: React.FC<RequestPasswordProps> = ({ setPassword }) => {
  const [pass, setPass] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPassword(pass);
  };

  return (
    <LightboxOverlay isOpen={true}>
      <LightboxContent width={["95vw", null, "400px"]}>
        <Text mb={5}>This retro is protected by a password.</Text>
        <form onSubmit={handleSubmit}>
          <Password
            autoComplete="new-password"
            name="password"
            width="100%"
            ml={0}
            mb={5}
            placeholder="Confirm a password for this retro"
            value={pass}
            onChange={pass => setPass(pass)}
            required
            minLength={4}
            shouldFocus
          />
          <Button type="submit">Confirm Password</Button>
        </form>
      </LightboxContent>
    </LightboxOverlay>
  );
};

export { RequestPassword };
