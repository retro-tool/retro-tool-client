import React, { useState } from "react";
import styled, { css } from "styled-components";
import themeGet from "@styled-system/theme-get";
import { useSlug } from "components/Slug.context";
import { useStatus } from "components/StatusProvider";

import { LockOpen } from "styled-icons/material/LockOpen";
import { Lock } from "styled-icons/material/Lock";
import toast from "react-hot-toast";

import {
  Button,
  LightboxContent,
  LightboxOverlay,
  Password,
  Text
} from "components";
import { Flex } from "./UI";

import { useUpdateRetroMutation } from "generated/graphql";

/**
 * STYLES
 */
const iconStyles = css`
  color: ${themeGet("colors.secondaryGrey")};

  &:hover {
    color: ${themeGet("colors.link")};
    cursor: pointer;
  }
`;

const LockOpenIcon = styled(LockOpen).attrs({
  size: 24,
  title: "Retro not protected by password"
})`
  ${iconStyles};
`;

const LockClosedIcon = styled(Lock).attrs({
  size: 24,
  title: "Retro protected by password"
})`
  ${iconStyles};
`;

/**
 * MAIN COMPONENT
 */
export const Settings = () => {
  const slug = useSlug();
  const {
    password,
    setPassword,
    removePassword,
    thisRetroHasPasswordStored
  } = useStatus();

  const [pass, setPass] = useState<string>("");
  const [open, setOpen] = useState(false);

  const [updateRetro] = useUpdateRetroMutation({
    onCompleted: () => {
      if (thisRetroHasPasswordStored) {
        // update password
        toast.success("Password updated successfully");
      } else if (pass) {
        // new password
        toast.success("Password set successfully");
      }

      setPassword(pass);
      setPass("");
      setOpen(false);
    },
    onError: graphqlError => {
      console.log({ graphqlError });
      toast.error("Error trying to set a password");
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateRetro({
      variables: {
        input: {
          password: pass
        },
        slug,
        password
      }
    });
  };

  return (
    <>
      {password ? (
        <LockClosedIcon onClick={() => setOpen(true)} />
      ) : (
        <LockOpenIcon onClick={() => setOpen(true)} />
      )}
      <LightboxOverlay isOpen={open} onDismiss={() => setOpen(false)}>
        <LightboxContent width={["95vw", null, "480px"]}>
          {password ? (
            <>
              <Text as="h1" mb={2} fontSize={3} fontWeight={1}>
                This retro is protected with a password
              </Text>
              <Text mb={5}>
                Anyone with access to this retro can change or remove the
                password (that would make the retro public again).
              </Text>
            </>
          ) : (
            <>
              <Text as="h1" mb={2} fontSize={3} fontWeight={1}>
                Do you want to make this retro private?
              </Text>
              <Text mb={5}>
                Anyone with access to this retro can set, change or remove a
                password.
              </Text>
            </>
          )}

          <form onSubmit={handleSubmit}>
            <Password
              name="password"
              autoComplete="new-password"
              width="100%"
              ml={0}
              mb={5}
              placeholder="Set a password for this retro"
              value={pass}
              onChange={pass => setPass(pass)}
              required
              minLength={4}
              shouldFocus
            />
            <Flex justifyContent="space-between">
              <Button
                bg="mediumGrey"
                onClick={() => setOpen(false)}
                variant="secondary"
              >
                Cancel
              </Button>
              <div>
                {password ? (
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        // updateRetro({
                        //   variables: {
                        //     input: {
                        //       password: null,
                        //     },
                        //     slug,
                        //     password,
                        //   },
                        // });
                        removePassword();
                        setOpen(false);
                      }}
                    >
                      Remove password
                    </Button>
                    <Button type="submit" ml={2} name="update-password">
                      Update Password
                    </Button>
                  </>
                ) : (
                  <Button type="submit" name="set-password">
                    Set Password
                  </Button>
                )}
              </div>
            </Flex>
          </form>
        </LightboxContent>
      </LightboxOverlay>
    </>
  );
};
