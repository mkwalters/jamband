import { gql, useQuery } from "@apollo/client";
import React, { createContext, useContext } from "react";
import { useHistory } from "react-router";

const userQuery = gql`
  query AuthenticatedUser {
    authenticatedUser {
      id
      email
      firstName
      lastName
      image
      signatureBlock
      connectedGoogleCalendar
      organizationMemberships {
        id
        role
        organization {
          id
          name
          billingEmail
          stripeCustomerId
          stripeLast4
        }
      }
      venueMemberships {
        id
        venue {
          id
          name
          salesTeamFeaturesEnabled
        }
      }
    }
  }
`;

const AuthenticatedUserContext = createContext({ user: null });

export const useAuthenticatedUser = () => useContext(AuthenticatedUserContext);

const unauthenticatedPaths = ["/users/sign_in"];

export default ({ children }) => {
  const history = useHistory();
  const skip = _.some(
    unauthenticatedPaths,
    (unauthenticatedPath) => unauthenticatedPath === history.location.pathname
  );
  const { data } = useQuery(userQuery, { skip });
  const authenticatedUser = data?.authenticatedUser;

  if (!authenticatedUser && !skip) {
    return null;
  }

  const value = {
    authenticatedUser,
  };

  return (
    <AuthenticatedUserContext.Provider value={value}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
